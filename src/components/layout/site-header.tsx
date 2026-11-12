"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthRequiredPrompt } from "@/components/auth/auth-required-prompt";
import { DEMO_ACCOUNTS, roleLabel, useDemoAuth } from "@/components/auth/demo-auth";

const navigationLinks = [
  { href: "/properties", label: "Find a home" },
  { href: "/neighbourhoods", label: "Neighbourhoods" },
  { href: "/how-it-works", label: "How it works" },
];

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [pendingProfile, setPendingProfile] = useState<typeof DEMO_ACCOUNTS[number] | null>(null);
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { session, isReady, signIn, signOut } = useDemoAuth();

  useEffect(() => {
    function handleOutsidePointer(event: PointerEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleSavedHomes() {
    closeMenu();
    if (session?.active) {
      router.push("/dashboard/favorites");
      return;
    }
    setShowAuthPrompt(true);
  }

  function handleLogout() { signOut(); closeMenu(); setIsAccountMenuOpen(false); router.push("/"); }

  function switchDemoProfile(account: typeof DEMO_ACCOUNTS[number]) {
    closeMenu();
    setIsAccountMenuOpen(false);
    setPendingProfile(account);
  }

  function completeProfileSwitch(account: typeof DEMO_ACCOUNTS[number]) {
    signIn({ name: account.name, email: account.email, role: account.role, active: true });
    setPendingProfile(null);
    router.push(account.destination);
  }

  return (
    <header className="bg-page">
      <div className="mx-auto flex min-h-20 w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold tracking-[0.12em] text-primary-text"
        >
          [APP NAME]
          <span className="sr-only"> home</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-9 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-primary-text transition-colors hover:text-secondary-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-10 md:flex">
          <button type="button" onClick={() => session ? router.push("/dashboard/favorites") : setShowAuthPrompt(true)} className="flex items-center gap-2 text-sm font-medium text-primary-text transition-colors hover:text-secondary-text">
            <HeartIcon />
            Saved homes
          </button>
          {isReady && session ? <div className="relative flex items-center gap-3"><button type="button" onClick={() => setIsAccountMenuOpen((current) => !current)} aria-expanded={isAccountMenuOpen} aria-haspopup="menu" className="rounded-md px-2 py-1 text-left hover:bg-cream"><span className="block text-sm font-medium text-primary-text">{session.name}</span><span className="block text-xs text-secondary-text">{roleLabel(session.role)}</span></button>{isAccountMenuOpen && <AccountMenu sessionRole={session.role} onSwitch={switchDemoProfile} onLogout={handleLogout} />}</div> : <><Link
            href="/login"
            className="text-sm font-medium text-primary-text transition-colors hover:text-secondary-text"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-pill bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal"
          >
            Sign up
          </Link></>}
        </div>

        <div ref={mobileMenuRef} className="relative md:hidden">
          <button type="button" onClick={() => setIsMenuOpen((current) => !current)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-primary-text">
            Menu
            <span aria-hidden="true" className="text-base leading-none">{isMenuOpen ? "−" : "+"}</span>
          </button>
          {isMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute right-0 z-10 mt-3 flex w-64 flex-col gap-1 rounded-lg bg-surface p-3 shadow-card">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-page"
              >
                {link.label}
              </Link>
            ))}
            <button type="button" onClick={handleSavedHomes} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-medium text-primary-text hover:bg-page">
              <HeartIcon />
              Saved homes
            </button>
            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-page"
            >
              Log in
            </Link>
            {session ? <><div className="mt-2 border-t border-border px-3 pt-3"><p className="text-sm font-medium text-primary-text">{session.name}</p><p className="mt-1 text-xs text-secondary-text">{roleLabel(session.role)}</p><p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Switch demo profile</p></div>{DEMO_ACCOUNTS.map((account) => <button key={account.email} type="button" role="menuitem" onClick={() => switchDemoProfile(account)} className="flex items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-primary-text hover:bg-page"><span>{account.label}</span>{account.role === session.role && <span aria-label="Active profile">✓</span>}</button>)}<button type="button" onClick={handleLogout} className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-primary-text hover:bg-page">Log out</button></> : null}
            <Link
              href="/signup"
              onClick={closeMenu}
              className="mt-2 rounded-pill bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-charcoal"
            >
              Sign up
            </Link>
          </nav>}
        </div>
      </div>
      {showAuthPrompt && <AuthRequiredPrompt onClose={() => setShowAuthPrompt(false)} />}
      {pendingProfile && <ProfilePasswordDialog account={pendingProfile} onCancel={() => setPendingProfile(null)} onSuccess={completeProfileSwitch} />}
    </header>
  );
}

function AccountMenu({ sessionRole, onSwitch, onLogout }: { sessionRole: string; onSwitch: (account: typeof DEMO_ACCOUNTS[number]) => void; onLogout: () => void }) {
  return <div role="menu" className="absolute right-0 top-full z-20 mt-3 w-64 rounded-lg bg-surface p-3 shadow-card"><p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Switch demo profile</p>{DEMO_ACCOUNTS.map((account) => <button key={account.email} type="button" role="menuitem" onClick={() => onSwitch(account)} className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-primary-text hover:bg-page"><span><span className="block font-medium">{account.label}</span><span className="block text-xs text-secondary-text">{account.name}</span></span>{account.role === sessionRole && <span aria-label="Active profile">✓</span>}</button>)}<button type="button" onClick={onLogout} className="mt-2 w-full border-t border-border px-3 pt-3 text-left text-sm font-medium text-primary-text hover:text-secondary-text">Log out</button></div>;
}

function ProfilePasswordDialog({ account, onCancel, onSuccess }: { account: typeof DEMO_ACCOUNTS[number]; onCancel: () => void; onSuccess: (account: typeof DEMO_ACCOUNTS[number]) => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== account.password) {
      setError("That password is not correct for this demo profile.");
      return;
    }
    onSuccess(account);
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5" role="presentation" onClick={onCancel}><section role="dialog" aria-modal="true" aria-labelledby="profile-password-heading" className="w-full max-w-md rounded-[12px] bg-white p-6 shadow-card sm:p-8" onClick={(event) => event.stopPropagation()}><p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Demo profile switch</p><h2 id="profile-password-heading" className="mt-2 font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">Confirm {account.label}</h2><p className="mt-3 text-sm leading-6 text-grey">Enter the configured demo password before changing profiles.</p><form onSubmit={handleSubmit} className="mt-5"><label htmlFor="profile-switch-password" className="block text-sm font-medium text-charcoal">Password</label><div className="relative mt-2"><input id="profile-switch-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} autoFocus autoComplete="off" className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 pr-20 text-sm text-charcoal outline-none focus:border-charcoal" aria-invalid={Boolean(error)} aria-describedby={error ? "profile-switch-error" : undefined} /><button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-grey underline underline-offset-2">{showPassword ? "Hide" : "Show"}</button></div>{error && <p id="profile-switch-error" className="mt-2 text-xs text-red-700" role="alert">{error}</p>}<div className="mt-5 flex gap-3"><button type="button" onClick={onCancel} className="h-11 flex-1 rounded-md border border-[#e5ded2] px-4 text-sm font-medium text-charcoal hover:bg-cream">Cancel</button><button type="submit" className="h-11 flex-1 rounded-md bg-black px-4 text-sm font-medium text-white hover:bg-charcoal">Switch profile</button></div></form></section></div>;
}
