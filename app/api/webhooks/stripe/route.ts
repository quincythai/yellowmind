// app/api/webhooks/stripe/route.ts

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const signature = req.headers.get("stripe-signature")!;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("❌ STRIPE_WEBHOOK_SECRET is not configured");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log("🔔 Stripe Event:", event.type);

  // central upsert logic
  async function handleSubscriptionUpdate(
    sub: Stripe.Subscription,
    fallbackUid?: string
  ) {
    // metadata.uid is now on the subscription itself
    const firebaseUid = sub.metadata.uid || fallbackUid;
    if (!firebaseUid) {
      console.warn("⚠️ No UID for subscription", sub.id);
      return;
    }

    const data = {
      userId: firebaseUid,
      priceId: sub.items.data[0].price.id,
      status: sub.status,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd:   new Date(sub.current_period_end   * 1000),
      // default undefined → false
      cancelAtPeriodEnd:  sub.cancelAtPeriodEnd ?? false,
    };

    // write subscription record
    await setDoc(doc(db, "subscriptions", sub.id), data, { merge: true });

    // update the user’s subscription flag
    const isActive = ["active", "trialing"].includes(sub.status);
    await setDoc(
      doc(db, "users", firebaseUid),
      { hasActiveSubscription: isActive },
      { merge: true }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const fallbackUid = session.metadata.uid as string | undefined;

      if (session.mode === "subscription" && session.subscription) {
        // retrieve the subscription with its metadata
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        await handleSubscriptionUpdate(sub, fallbackUid);
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      await handleSubscriptionUpdate(
        event.data.object as Stripe.Subscription
      );
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const firebaseUid = sub.metadata.uid as string | undefined;
      if (firebaseUid) {
        await deleteDoc(doc(db, "subscriptions", sub.id));
        await setDoc(
          doc(db, "users", firebaseUid),
          { hasActiveSubscription: false },
          { merge: true }
        );
      }
      break;
    }

    default:
      console.log("ℹ️ Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
