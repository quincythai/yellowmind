// app/admin/layout.tsx
"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireRole="admin">
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        {children}
      </div>
    </AuthGuard>
  );
}
