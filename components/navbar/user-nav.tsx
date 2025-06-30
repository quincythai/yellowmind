"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarCheck, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function UserNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login page after successful logout
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // You might want to show a toast notification here
    }
  };

  const handleTabNavigation = (tab: string) => {
    router.push(`/account?tab=${tab}`);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Book Appointment Button */}
      <Button
        asChild
        size="sm"
        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
      >
        <Link href="/book-appointment" className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4" />
          Book Appointment
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              {user?.photoURL ? (
                <AvatarImage src={user.photoURL} alt={displayName} />
              ) : (
                <AvatarFallback className="bg-yellow-100 text-yellow-800">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleTabNavigation("profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTabNavigation("billing")}>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleTabNavigation("notifications")}
          >
            Notifications
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
