// app/api/webhooks/stripe/route.ts

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  // 1️⃣ Read raw body + signature
  const buf = await req.arrayBuffer();
  const signature = req.headers.get("stripe-signature")!;

  // 2️⃣ Check webhook secret
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("❌ STRIPE_WEBHOOK_SECRET is not configured");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  // 3️⃣ Verify event integrity
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

  // Centralized upsert logic
  async function handleSubscriptionUpdate(
    sub: Stripe.Subscription,
    fallbackUid?: string
  ) {
    // Get your user’s UID from metadata
    const firebaseUid = sub.metadata.uid || fallbackUid;
    if (!firebaseUid) {
      console.warn("⚠️ No UID for subscription", sub.id);
      return;
    }

    // Build the data payload, using JS Date (Admin SDK auto-converts)
    const data = {
      userId: firebaseUid,
      priceId: sub.items.data[0].price.id,
      status: sub.status,
      currentPeriodStart: new Date((sub.current_period_start ?? 0) * 1000),
      currentPeriodEnd:   new Date((sub.current_period_end   ?? 0) * 1000),
      cancelAtPeriodEnd:  sub.cancel_at_period_end ?? false,
    };

    // 4️⃣ Upsert subscription doc
    await adminDb
      .doc(`subscriptions/${sub.id}`)
      .set(data, { merge: true });

    // 5️⃣ Update the user’s “hasActiveSubscription” flag
    const isActive = ["active", "trialing"].includes(sub.status);
    await adminDb
      .doc(`users/${firebaseUid}`)
      .set({ hasActiveSubscription: isActive }, { merge: true });
  }

  // 6️⃣ Route events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const fallbackUid = session.metadata.uid as string | undefined;

      if (session.mode === "subscription" && session.subscription) {
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
        // Delete the subscription record
        await adminDb.doc(`subscriptions/${sub.id}`).delete();
        // Mark user unsubscribed
        await adminDb
          .doc(`users/${firebaseUid}`)
          .set({ hasActiveSubscription: false }, { merge: true });
      }
      break;
    }

    default:
      console.log("ℹ️ Unhandled event type:", event.type);
  }

  // 7️⃣ Acknowledge receipt
  return NextResponse.json({ received: true });
}
