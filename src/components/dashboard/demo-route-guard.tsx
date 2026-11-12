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
  return <>{children}<div className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-md border border-[#e5ded2] bg-white px-4 py-3 text-xs text-grey shadow-subtle"><span>Demo mode · {roleLabel(session.role)}</span><Link href="/" className="font-medium text-charcoal underline underline-offset-2">Public site</Link></div></>;
}
