"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { roleLabel, useDemoAuth, type DemoRole } from "@/components/auth/demo-auth";

function requiredRole(pathname: string): DemoRole {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/contributor")) return "contributor";
  return "user";
}

export function DemoRouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, isReady, signOut } = useDemoAuth();
  const role = requiredRole(pathname);

  useEffect(() => {
    if (!isReady) return;
    if (!session) { router.replace("/"); return; }
    if (session.role !== role) router.replace(session.role === "admin" ? "/admin" : session.role === "contributor" ? "/contributor/properties" : "/dashboard");
  }, [isReady, session, role, router]);

  function handleLogout() {
    signOut();
    router.replace("/");
  }

  if (!isReady || !session || session.role !== role) return <main className="flex min-h-screen items-center justify-center bg-cream px-6"><p className="text-sm text-grey">Preparing your demonstration session…</p></main>;
  const navigation = session.role === "user"
    ? [{ href: "/dashboard", label: "Overview" }, { href: "/dashboard/favorites", label: "Saved homes" }, { href: "/dashboard/enquiries", label: "Enquiries" }, { href: "/dashboard/profile", label: "Profile & settings" }]
    : session.role === "contributor"
      ? [{ href: "/contributor/properties", label: "Overview" }, { href: "/contributor/properties/manage", label: "My properties" }, { href: "/contributor/properties/new", label: "Add property" }]
      : [{ href: "/admin", label: "Overview" }, { href: "/admin/properties", label: "Property reviews" }, { href: "/admin/properties/manage", label: "All properties" }, { href: "/admin/users", label: "Users" }, { href: "/admin/contributors", label: "Contributors" }, { href: "/admin/reports", label: "Reports" }, { href: "/admin/advertisements", label: "Advertisements" }, { href: "/admin/settings", label: "Settings" }];

  return <div className="min-h-screen bg-cream md:grid md:grid-cols-[220px_minmax(0,1fr)]"><aside className="hidden h-screen flex-col border-r border-border bg-white p-5 md:flex md:sticky md:top-0"><div><p className="text-sm font-semibold tracking-[0.12em] text-charcoal">[APP NAME]</p><p className="mt-2 text-xs text-grey">{roleLabel(session.role)} · Demo mode</p></div><nav className="mt-10 flex flex-col gap-1" aria-label="Dashboard navigation">{navigation.map((item) => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-cream">{item.label}</Link>)}</nav><div className="mt-auto border-t border-border pt-4"><Link href="/" className="block px-3 pb-3 text-sm font-medium text-charcoal hover:text-grey">Go Back to Public Site</Link><button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-medium text-[#8a423b] hover:bg-[#f5e2df]"><LogoutIcon />Log out</button></div></aside><div className="min-w-0"><nav className="flex flex-wrap gap-1 border-b border-border bg-white p-3 md:hidden" aria-label="Dashboard navigation">{navigation.map((item) => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-xs font-medium text-charcoal hover:bg-cream">{item.label}</Link>)}<Link href="/" className="mt-2 basis-full border-t border-border px-3 pt-3 text-xs font-medium text-charcoal hover:text-grey">Go Back to Public Site</Link><button type="button" onClick={handleLogout} className="flex basis-full items-center gap-2 border-t border-border px-3 pt-3 text-left text-xs font-semibold text-[#8a423b] hover:text-[#8a423b]"><LogoutIcon />Log out</button></nav>{children}</div></div>;
}

function LogoutIcon() { return <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" /></svg>; }
