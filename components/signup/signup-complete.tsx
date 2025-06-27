"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Mail, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export function SignupCompletePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload(); // force refresh of emailVerified status
        if (user.emailVerified) {
          router.push("/subscription");
        }
      }
    }, 3000); // checks every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    setEmailSent(true);
    setCanResend(false);
    setCountdown(60);

    // Simulate email sending
    setTimeout(() => {
      setEmailSent(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
              <Brain className="h-8 w-8 text-yellow-900" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            <span className="text-yellow-600">YELLOW</span> Mind
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success Message */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">
              Account Created Successfully!
            </h2>
            <p className="text-muted-foreground">
              Welcome to YELLOW Mind! We're excited to have you join our
              emotional intelligence community.
            </p>
          </div>

          {/* Email Verification */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-800">Verify Your Email</h3>
            </div>
            <p className="text-sm text-blue-700">
              We've sent a verification email to:
            </p>
            <p className="font-medium text-blue-800 bg-white px-3 py-2 rounded border">
              {email}
            </p>
            <p className="text-sm text-blue-700">
              Please check your inbox and click the verification link to
              activate your account.
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-medium">Next Steps:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-yellow-600">1</span>
                </div>
                <div>
                  <p className="font-medium">Check your email</p>
                  <p className="text-sm text-muted-foreground">
                    Look for an email from YELLOW Mind
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-yellow-600">2</span>
                </div>
                <div>
                  <p className="font-medium">Click the verification link</p>
                  <p className="text-sm text-muted-foreground">
                    This will activate your account
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-yellow-600">3</span>
                </div>
                <div>
                  <p className="font-medium">Choose your subscription</p>
                  <p className="text-sm text-muted-foreground">
                    Select a plan to access all features
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resend Email */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Didn't receive the email?
              </span>
              {!canResend && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{countdown}s</span>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={!canResend || emailSent}
              className="w-full bg-transparent"
            >
              {emailSent ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                  Email Sent!
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full bg-transparent"
            >
              <Link href="/">Go to Dashboard</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Link
                href="mailto:support@yellowmind.com"
                className="text-yellow-600 hover:text-yellow-700"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
