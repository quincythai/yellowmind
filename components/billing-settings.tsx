"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
  Loader2,
} from "lucide-react";

type SubscriptionData = {
  hasActiveSubscription: boolean;
  subscription: {
    id: string;
    status: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    priceId: string;
    amount: string;
    currency: string;
    interval: string;
  } | null;
  paymentMethod: {
    card: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
  } | null;
  invoices: Array<{
    id: string;
    date: string;
    amount: string;
    status: string;
    pdf: string | null;
    hostedInvoiceUrl: string | null;
  }>;
};

export function BillingSettings() {
  const { user } = useAuth();
  const [billingData, setBillingData] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      if (!user?.uid) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/billing/subscription?uid=${user.uid}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch billing data");
        }

        const data = await response.json();
        setBillingData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillingData();
  }, [user?.uid]);

  const handleCancelSubscription = async () => {
    if (!user?.uid || !billingData?.subscription) return;

    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You will lose access at the end of your current billing period."
      )
    ) {
      return;
    }

    try {
      setIsActionLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch("/api/billing/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      // Refresh billing data
      const refreshResponse = await fetch(
        `/api/billing/subscription?uid=${user.uid}`
      );
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setBillingData(data);
        setSuccessMessage(
          "Subscription cancelled successfully. You will have access until the end of your current billing period."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to cancel subscription"
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    if (!user?.uid || !billingData?.subscription) return;

    try {
      setIsActionLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch("/api/billing/subscription/reactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to reactivate subscription");
      }

      // Refresh billing data
      const refreshResponse = await fetch(
        `/api/billing/subscription?uid=${user.uid}`
      );
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setBillingData(data);
        setSuccessMessage("Subscription reactivated successfully!");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to reactivate subscription"
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDownloadInvoice = (invoice: SubscriptionData["invoices"][0]) => {
    if (invoice.hostedInvoiceUrl) {
      window.open(invoice.hostedInvoiceUrl, "_blank");
    } else if (invoice.pdf) {
      window.open(invoice.pdf, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-8 w-8 mx-auto text-red-500 mb-4" />
        <p className="text-red-600">Failed to load billing information</p>
      </div>
    );
  }

  if (!billingData?.hasActiveSubscription) {
    return (
      <div className="space-y-6">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              No Active Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              You don&apos;t have an active subscription. Please subscribe to
              access premium features.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { subscription, paymentMethod, invoices } = billingData;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-green-700">{successMessage}</p>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Billing Notice - Moved to top */}
      {subscription?.cancelAtPeriodEnd && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              Subscription Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              Your subscription has been cancelled and will end on{" "}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}.
              You can reactivate your subscription anytime before this date to
              continue your access.
            </p>
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={handleReactivateSubscription}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Reactivating...
                  </>
                ) : (
                  "Reactivate Subscription"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Premium Plan</h3>
                <p className="text-muted-foreground">
                  Full access to all courses and coaching sessions
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ${subscription?.amount}
                </div>
                <div className="text-sm text-muted-foreground">
                  per {subscription?.interval}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Next Billing Date</h4>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(
                      subscription?.currentPeriodEnd || ""
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Billing Cycle</h4>
                <span className="capitalize">{subscription?.interval}ly</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button
                variant="outline"
                onClick={handleCancelSubscription}
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Cancel Subscription"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethod ? (
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    {paymentMethod.card.brand.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">
                      •••• •••• •••• {paymentMethod.card.last4}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires{" "}
                      {paymentMethod.card.exp_month.toString().padStart(2, "0")}
                      /{paymentMethod.card.exp_year}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Default
                </Badge>
              </div>
            ) : (
              <div className="p-4 border rounded-lg text-center text-muted-foreground">
                No payment method on file
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline">Add Payment Method</Button>
              <Button variant="outline">Update Card</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium">{invoice.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {invoice.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{invoice.amount}</div>
                      <Badge
                        variant="outline"
                        className={
                          invoice.status === "Paid"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    {(invoice.pdf || invoice.hostedInvoiceUrl) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No billing history available
              </div>
            )}

            <Button variant="outline" className="w-full">
              View All Invoices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
