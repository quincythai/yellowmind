"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText, Settings } from "lucide-react";

export function AdminNav() {
  return (
    <nav className="flex items-center gap-4 p-4 bg-white rounded-lg border">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Users
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/appointments" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Appointments
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/daily-shorts" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Daily Shorts
        </Link>
      </Button>
    </nav>
  );
}
