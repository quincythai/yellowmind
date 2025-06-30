import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDb } from "@/lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get user's subscription from Firestore
    const userDoc = await adminDb.doc(`users/${uid}`).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    
    if (!userData?.hasActiveSubscription) {
      return NextResponse.json({
        hasActiveSubscription: false,
        subscription: null,
        paymentMethod: null,
        invoices: []
      });
    }

    // Get subscription details from Firestore
    const subscriptionsSnapshot = await adminDb
      .collection("subscriptions")
      .where("userId", "==", uid)
      .where("status", "in", ["active", "trialing"])
      .limit(1)
      .get();

    if (subscriptionsSnapshot.empty) {
      return NextResponse.json({
        hasActiveSubscription: false,
        subscription: null,
        paymentMethod: null,
        invoices: []
      });
    }

    const subscriptionDoc = subscriptionsSnapshot.docs[0];
    const subscriptionData = subscriptionDoc.data();

    // Get Stripe subscription details
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscriptionData.subscriptionId
    );

    // Get the first subscription item
    const subscriptionItem = stripeSubscription.items.data[0];

    // Get payment method
    let paymentMethod = null;
    if (stripeSubscription.default_payment_method) {
      paymentMethod = await stripe.paymentMethods.retrieve(
        stripeSubscription.default_payment_method as string
      );
    }

    // Get invoices
    const invoices = await stripe.invoices.list({
      customer: subscriptionData.stripeCustomerId,
      limit: 10,
    });

    return NextResponse.json({
      hasActiveSubscription: true,
      subscription: {
        id: stripeSubscription.id,
        status: stripeSubscription.status,
        currentPeriodStart: new Date((subscriptionItem.current_period_start ?? 0) * 1000),
        currentPeriodEnd: new Date((subscriptionItem.current_period_end ?? 0) * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
        priceId: subscriptionData.priceId,
        amount: subscriptionItem.price.unit_amount 
          ? (subscriptionItem.price.unit_amount / 100).toFixed(2)
          : "0.00",
        currency: stripeSubscription.currency.toUpperCase(),
        interval: subscriptionItem.price.recurring?.interval || "month"
      },
      paymentMethod,
      invoices: invoices.data.map(invoice => ({
        id: invoice.number,
        date: new Date(invoice.created * 1000).toISOString().split('T')[0],
        amount: `$${(invoice.amount_paid / 100).toFixed(2)}`,
        status: invoice.status === 'paid' ? 'Paid' : invoice.status,
        pdf: invoice.invoice_pdf,
        hostedInvoiceUrl: invoice.hosted_invoice_url
      }))
    });

  } catch (error) {
    console.error("Error fetching subscription data:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription data" },
      { status: 500 }
    );
  }
} 