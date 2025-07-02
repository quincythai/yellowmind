"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  requireRole?: "admin";
}

export function AuthGuard({ children, requireRole }: AuthGuardProps) {
  const { user, isLoading, hasActiveSubscription, userData } = useAuth();
  const router = useRouter();
  const isAdmin = userData?.role === "admin";

  // Stripe loader
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const redirectToCheckout = async () => {
    if (!user) return;
    const stripe = await stripePromise;
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, uid: user.uid }),
    });
    const { sessionId } = await res.json();
    await stripe?.redirectToCheckout({ sessionId });
  };

  // ➡️ Move all router.replace calls into useEffect
  useEffect(() => {
    if (isLoading) return; // **wait** until auth status settles

    // 2️⃣ Not signed in
    if (!user) {
      router.replace("/login");
      return;
    }

    // 3️⃣ Role enforcement
    if (requireRole === "admin" && !isAdmin) {
      router.replace("/");
      return;
    }

    // 3.5️⃣ Admin hitting regular pages
    if (!requireRole && isAdmin) {
      router.replace("/admin");
      return;
    }
  }, [isLoading, user, requireRole, isAdmin, router]);

  // 1️⃣ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
      </div>
    );
  }

  // 2️⃣ Block UI until redirect effect runs
  if (
    !user ||
    (requireRole === "admin" && !isAdmin) ||
    (!requireRole && isAdmin)
  ) {
    return null;
  }

  // 4️⃣ Email verification
  if (!user.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <Card className="max-w-md w-full shadow">
          <CardHeader className="text-center">
            <Brain className="mx-auto mb-2 h-8 w-8 text-orange-600" />
            <CardTitle>Email Verification Required</CardTitle>
            <p className="text-muted-foreground">
              Please verify your email to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              We&apos;ve sent a verification link to{" "}
              <strong>{user.email}</strong>.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-orange-500 to-red-500"
            >
              <Link href="/signup-complete">Resend &amp; Check Email</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Back to Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 5️⃣ Admin flow (skip subscription)
  if (requireRole === "admin" || isAdmin) {
    return <>{children}</>;
  }

  // 6️⃣ Subscription paywall
  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <Card className="max-w-lg w-full shadow">
          <CardHeader className="text-center">
            <CreditCard className="mx-auto mb-2 h-8 w-8 text-purple-600" />
            <CardTitle>Subscription Required</CardTitle>
            <p className="text-muted-foreground">
              Unlock your emotional intelligence journey
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-2 font-semibold text-purple-800">
                Premium access includes:
              </p>
              <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                <li>8 comprehensive modules</li>
                <li>1-on-1 coaching sessions</li>
                <li>Live workshops & community</li>
                <li>Progress tracking & certificates</li>
              </ul>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-purple-600">
                $59/month
              </span>
              <p className="text-sm text-muted-foreground">
                30-day money-back guarantee
              </p>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
              onClick={redirectToCheckout}
            >
              Subscribe Now
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Sign Out</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 7️⃣ All checks passed
  return <>{children}</>;
}

export default AuthGuard;
