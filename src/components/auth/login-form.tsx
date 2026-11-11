"use client";

import { FormEvent, useState } from "react";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z" />
      <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z" />
      <path fill="#FBBC05" d="M6.54 13.58A5.84 5.84 0 0 1 6.24 12c0-.55.1-1.08.3-1.58V7.89H3.3A9.5 9.5 0 0 0 2.25 12c0 1.48.36 2.88 1.05 4.11l3.24-2.53Z" />
      <path fill="#EA4335" d="M12 6.39c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z" />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58a2 2 0 0 0 2.83 2.83M9.88 5.09A10.4 10.4 0 0 1 12 4.86c5 0 8.27 4.17 9.28 5.64a2.8 2.8 0 0 1 0 3c-.39.57-.98 1.35-1.75 2.13M6.61 6.61C4.75 7.72 3.35 9.42 2.72 10.5a2.8 2.8 0 0 0 0 3C3.73 14.97 7 19.14 12 19.14c1.2 0 2.31-.24 3.3-.63" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.72 10.5C3.73 9.03 7 4.86 12 4.86s8.27 4.17 9.28 5.64a2.8 2.8 0 0 1 0 3C20.27 14.97 17 19.14 12 19.14s-8.27-4.17-9.28-5.64a2.8 2.8 0 0 1 0-3Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formMessage, setFormMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: typeof errors = {};

    if (!email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";

    setErrors(nextErrors);
    setFormMessage(Object.keys(nextErrors).length === 0 ? "Demo only: login is not connected." : "Please review the highlighted fields.");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Log in">
      <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#e5ded2] bg-white font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal hover:bg-[#fbfaf7]">
        <GoogleIcon />
        Continue with Google
      </button>
      <div className="flex items-center gap-4 text-xs text-grey"><span className="h-px flex-1 bg-[#e5ded2]" />or<span className="h-px flex-1 bg-[#e5ded2]" /></div>

      <div>
        <label htmlFor="login-email" className="block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Email address</label>
        <input id="login-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: undefined })); }} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "login-email-error" : undefined} className="mt-2 h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />
        {errors.email && <p id="login-email-error" className="mt-1 text-xs text-red-700">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="login-password" className="block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Password</label>
        <div className="relative mt-2">
          <input id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined })); }} autoComplete="current-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "login-password-error" : undefined} className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 pr-12 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />
          <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-grey" aria-label={showPassword ? "Hide password" : "Show password"}><EyeIcon hidden={!showPassword} /></button>
        </div>
        {errors.password && <p id="login-password-error" className="mt-1 text-xs text-red-700">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm text-charcoal"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="size-4 rounded border-border accent-black" />Remember me</label>
        <a href="/reset-password" className="font-[family-name:var(--font-inter)] text-sm text-charcoal underline underline-offset-4">Forgot password?</a>
      </div>

      <button type="submit" className="h-12 w-full rounded-md bg-black px-5 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Log in</button>
      {formMessage && <p role="status" className="text-sm text-grey">{formMessage}</p>}
    </form>
  );
}
