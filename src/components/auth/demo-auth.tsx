"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type DemoRole = "user" | "contributor" | "admin";
export type DemoSession = { name: string; email: string; role: DemoRole; active: true };

type DemoAuthContextValue = {
  session: DemoSession | null;
  isReady: boolean;
  signIn: (session: DemoSession) => void;
  signOut: () => void;
};

const STORAGE_KEY = "house-hunting-demo-session";
const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

export const DEMO_ACCOUNTS = [
  { role: "user" as const, label: "Registered user", email: "demo.user@househunt.test", password: "DemoUser123!", name: "Demo User", destination: "/dashboard" },
  { role: "contributor" as const, label: "Contributor / Agent", email: "demo.agent@househunt.test", password: "DemoAgent123!", name: "Demo Agent", destination: "/contributor/properties" },
  { role: "admin" as const, label: "Administrator", email: "demo.admin@househunt.test", password: "DemoAdmin123!", name: "Demo Administrator", destination: "/admin" },
] as const;

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) queueMicrotask(() => setSession(JSON.parse(stored) as DemoSession));
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  function signIn(nextSession: DemoSession) {
    setSession(nextSession);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
  }

  function signOut() {
    setSession(null);
    window.sessionStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(() => ({ session, isReady, signIn, signOut }), [session, isReady]);
  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) throw new Error("useDemoAuth must be used inside DemoAuthProvider");
  return context;
}

export function roleLabel(role: DemoRole) {
  return role === "admin" ? "Administrator" : role === "contributor" ? "Contributor / Agent" : "Registered user";
}
