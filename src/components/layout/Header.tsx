"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, User, LogOut } from "lucide-react";
import { clearAuthCookie } from "@/lib/auth";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  // Simple breadcrumb logic based on pathname
  const title =
    pathname === "/"
      ? "Dashboard Overview"
      : pathname.split("/")[1].charAt(0).toUpperCase() +
        pathname.split("/")[1].slice(1);

  function handleLogout() {
    clearAuthCookie();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-foreground tracking-tight">
        {title}
      </h2>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 rounded-full border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu((p) => !p)}
            className="flex items-center gap-3 border-l border-border pl-6 cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-sm text-left">
              <p className="font-medium text-foreground leading-none">Admin User</p>
              <p className="text-muted-foreground text-xs mt-1">admin@example.com</p>
            </div>
          </button>

          {showMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-48 rounded-xl border border-border bg-card shadow-lg z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
