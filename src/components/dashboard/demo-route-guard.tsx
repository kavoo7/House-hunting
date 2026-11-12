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
  const { session, isReady } = useDemoAuth();
  const role = requiredRole(pathname);

  useEffect(() => {
    if (!isReady) return;
    if (!session) { router.replace("/login"); return; }
    if (session.role !== role) router.replace(session.role === "admin" ? "/admin" : session.role === "contributor" ? "/contributor/properties" : "/dashboard");
  }, [isReady, session, role, router]);

  if (!isReady || !session || session.role !== role) return <main className="flex min-h-screen items-center justify-center bg-cream px-6"><p className="text-sm text-grey">Preparing your demonstration session…</p></main>;
  const navigation = session.role === "user"
    ? [{ href: "/dashboard", label: "Overview" }, { href: "/dashboard/favorites", label: "Saved homes" }, { href: "/dashboard/enquiries", label: "Enquiries" }, { href: "/dashboard/profile", label: "Profile & settings" }]
    : session.role === "contributor"
      ? [{ href: "/contributor/properties", label: "Properties" }, { href: "/contributor/properties/new", label: "Add property" }]
      : [{ href: "/admin", label: "Overview" }, { href: "/admin/properties", label: "Manage properties" }];

  return <div className="min-h-screen bg-cream md:grid md:grid-cols-[220px_minmax(0,1fr)]"><aside className="hidden h-screen flex-col border-r border-border bg-white p-5 md:flex md:sticky md:top-0"><div><p className="text-sm font-semibold tracking-[0.12em] text-charcoal">[APP NAME]</p><p className="mt-2 text-xs text-grey">{roleLabel(session.role)} · Demo mode</p></div><nav className="mt-10 flex flex-col gap-1" aria-label="Dashboard navigation">{navigation.map((item) => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-cream">{item.label}</Link>)}</nav><Link href="/" className="mt-auto border-t border-border px-3 pt-5 text-sm font-medium text-charcoal hover:text-grey">Go Back to Public Site</Link></aside><div className="min-w-0"><nav className="flex flex-wrap gap-1 border-b border-border bg-white p-3 md:hidden" aria-label="Dashboard navigation">{navigation.map((item) => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-xs font-medium text-charcoal hover:bg-cream">{item.label}</Link>)}<Link href="/" className="mt-2 basis-full border-t border-border px-3 pt-3 text-xs font-medium text-charcoal hover:text-grey">Go Back to Public Site</Link></nav>{children}</div></div>;
}
