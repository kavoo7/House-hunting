"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DemoRole = "user" | "contributor" | "admin";
export type DemoSession = { name: string; email: string; phone?: string; role: DemoRole; active: true };

type DemoAuthContextValue = {
  session: DemoSession | null;
  isReady: boolean;
  signIn: (session: DemoSession) => void;
  signOut: () => void;
  updateProfile: (profile: Pick<DemoSession, "name" | "email" | "phone">) => void;
  favoritePropertyIds: string[];
  toggleFavorite: (propertyId: string) => void;
};

const STORAGE_KEY = "house-hunting-demo-session";
const FAVORITES_KEY = "house-hunting-demo-favorites";
const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

export const DEMO_ACCOUNTS = [
  { role: "user" as const, label: "Registered user", email: "demo.user@househunt.test", password: "DemoUser123!", name: "Demo User", destination: "/dashboard" },
  { role: "contributor" as const, label: "Contributor / Agent", email: "demo.agent@househunt.test", password: "DemoAgent123!", name: "Demo Agent", destination: "/contributor/properties" },
  { role: "admin" as const, label: "Administrator", email: "demo.admin@househunt.test", password: "DemoAdmin123!", name: "Demo Administrator", destination: "/admin" },
] as const;

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [favoritePropertyIds, setFavoritePropertyIds] = useState<string[]>([]);
  const [favoriteNotice, setFavoriteNotice] = useState("");

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) queueMicrotask(() => setSession(JSON.parse(stored) as DemoSession));
      const storedFavorites = window.sessionStorage.getItem(FAVORITES_KEY);
      queueMicrotask(() => setFavoritePropertyIds(storedFavorites ? JSON.parse(storedFavorites) as string[] : ["modern-westlands-home", "peaceful-city-retreat", "quiet-modern-apartment"]));
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

  function updateProfile(profile: Pick<DemoSession, "name" | "email" | "phone">) {
    if (!session) return;
    const nextSession = { ...session, ...profile };
    setSession(nextSession);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
  }

  function toggleFavorite(propertyId: string) {
    setFavoritePropertyIds((current) => {
      const next = current.includes(propertyId) ? current.filter((id) => id !== propertyId) : [...current, propertyId];
      window.sessionStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      setFavoriteNotice(current.includes(propertyId) ? "Property removed from your saved homes." : "Property added to your saved homes.");
      return next;
    });
  }

  useEffect(() => {
    if (!favoriteNotice) return;
    const timeout = window.setTimeout(() => setFavoriteNotice(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [favoriteNotice]);

  const value = { session, isReady, signIn, signOut, updateProfile, favoritePropertyIds, toggleFavorite };
  return <DemoAuthContext.Provider value={value}>{children}{favoriteNotice && <div role="status" aria-live="polite" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-md bg-charcoal px-4 py-3 text-center text-sm text-white shadow-card">{favoriteNotice}</div>}</DemoAuthContext.Provider>;
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) throw new Error("useDemoAuth must be used inside DemoAuthProvider");
  return context;
}

export function roleLabel(role: DemoRole) {
  return role === "admin" ? "Administrator" : role === "contributor" ? "Contributor / Agent" : "Registered user";
}
