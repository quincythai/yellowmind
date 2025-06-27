"use client";

import type React from "react";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lock, CreditCard, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading, hasActiveSubscription } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto">
            <Brain className="h-8 w-8 text-yellow-900" />
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Email not verified
  if (!user?.emailVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-orange-600">
              Email Verification Required
            </CardTitle>
            <p className="text-muted-foreground">
              Please verify your email to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                We've sent a verification email to{" "}
                <strong>{user?.email}</strong>
              </p>
            </div>
            <div className="space-y-2">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Link href="/signup-complete">Check Email & Verify</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <Link href="/login">Back to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No active subscription - paywall
  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-purple-600">
              Subscription Required
            </CardTitle>
            <p className="text-muted-foreground">
              Unlock your emotional intelligence journey
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">
                What you'll get with Premium:
              </h3>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• 8 comprehensive emotional intelligence modules</li>
                <li>• 1-on-1 coaching sessions with certified experts</li>
                <li>• Live workshops and community access</li>
                <li>• Progress tracking and certificates</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                $59/month
              </div>
              <p className="text-sm text-muted-foreground">
                30-day money-back guarantee
              </p>
            </div>

            <div className="space-y-2">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Link href="/subscription">Subscribe</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <Link href="/login">Sign Out</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // All checks passed - render the protected content
  return <>{children}</>;
}

export default AuthGuard;
