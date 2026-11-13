import type { ReactNode } from "react";
import { DemoRouteGuard } from "@/components/dashboard/demo-route-guard";
import { SiteHeader } from "@/components/layout/site-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <><SiteHeader /><DemoRouteGuard>{children}</DemoRouteGuard></>;
}
