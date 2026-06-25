"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Image as ImageIcon, Briefcase, FileText, Phone, Award, LogOut } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Home Page", href: "/home", icon: FileText },
  { name: "About Us", href: "/about", icon: FileText },
  { name: "Our Expertise", href: "/expertise", icon: Award },
  { name: "Our Projects", href: "/projects", icon: Briefcase },
  { name: "Our Team", href: "/team", icon: Users },
  // { name: "Team Leaders", href: "/team-leaders", icon: Users },
  // { name: "Design Team", href: "/design-team", icon: Users },
  // { name: "Studio Operations", href: "/studio-operations", icon: Users },
  // { name: "Studio Values", href: "/studio-values", icon: Award },
  // { name: "Services", href: "/services", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: ImageIcon },
  { name: "Contact Page", href: "/contact", icon: Phone },
  { name: "Enquiries", href: "/enquiries", icon: Phone },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <h1 className="text-xl font-bold tracking-tight text-primary">Admin Panel</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
