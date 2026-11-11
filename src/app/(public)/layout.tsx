import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />
      {children}
    </div>
  );
}
