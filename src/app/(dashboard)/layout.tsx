import type { ReactNode } from "react";
import { DemoRouteGuard } from "@/components/dashboard/demo-route-guard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DemoRouteGuard>{children}</DemoRouteGuard>;
}
