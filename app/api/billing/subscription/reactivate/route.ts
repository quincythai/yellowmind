import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDb } from "@/lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get user's subscription from Firestore
    const subscriptionsSnapshot = await adminDb
      .collection("subscriptions")
      .where("userId", "==", uid)
      .where("status", "in", ["active", "trialing"])
      .limit(1)
      .get();

    if (subscriptionsSnapshot.empty) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 });
    }

    const subscriptionDoc = subscriptionsSnapshot.docs[0];
    const subscriptionData = subscriptionDoc.data();

    // Reactivate the subscription by removing cancel_at_period_end
    const reactivatedSubscription = await stripe.subscriptions.update(
      subscriptionData.subscriptionId,
      {
        cancel_at_period_end: false,
      }
    );

    // Update Firestore
    await adminDb.doc(`subscriptions/${subscriptionData.subscriptionId}`).update({
      cancelAtPeriodEnd: false,
    });

    return NextResponse.json({
      success: true,
      message: "Subscription has been reactivated",
      cancelAtPeriodEnd: reactivatedSubscription.cancel_at_period_end,
    });

  } catch (error) {
    console.error("Error reactivating subscription:", error);
    return NextResponse.json(
      { error: "Failed to reactivate subscription" },
      { status: 500 }
    );
  }
} 