"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/profile-settings"
import { BillingSettings } from "@/components/billing-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { SecuritySettings } from "@/components/security-settings"

export function AccountTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="billing" className="mt-6">
        <BillingSettings />
      </TabsContent>

      <TabsContent value="notifications" className="mt-6">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="security" className="mt-6">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  )
}
