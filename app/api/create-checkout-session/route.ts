import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  const { email, uid } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    // TODO: change to actual domain
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
    customer_email: email,

    // ✨ Tell Stripe to attach metadata to the new Subscription ✨
    subscription_data: {
      metadata: { uid }
    },

    // (You can still keep session metadata if you like)
    metadata: { uid },
  });

  return NextResponse.json({ sessionId: session.id });
}