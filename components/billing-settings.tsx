"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export function BillingSettings() {
  const invoices = [
    { id: "INV-001", date: "2024-06-01", amount: "$29.99", status: "Paid" },
    { id: "INV-002", date: "2024-05-01", amount: "$29.99", status: "Paid" },
    { id: "INV-003", date: "2024-04-01", amount: "$29.99", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
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
                <div className="text-2xl font-bold">$29.99</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Next Billing Date</h4>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>July 1, 2024</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Billing Cycle</h4>
                <span>Monthly</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Cancel Subscription</Button>
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
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <div className="font-medium">•••• •••• •••• 4242</div>
                  <div className="text-sm text-muted-foreground">
                    Expires 12/26
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
            {invoices.map((invoice) => (
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
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full">
              View All Invoices
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Alerts */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="h-5 w-5" />
            Important Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">
            Your subscription will automatically renew on July 1, 2024. You can
            cancel anytime before the renewal date to avoid being charged.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
