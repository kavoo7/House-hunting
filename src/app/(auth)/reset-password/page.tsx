"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      setMessage("");
      return;
    }
    setError("");
    setMessage("Demo reset instructions are ready. No email was sent.");
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto max-w-xl rounded-[12px] bg-white p-6 shadow-subtle sm:p-10">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className="text-sm font-medium text-charcoal underline underline-offset-4">← Back to home</Link>
          <Link href="/login" className="text-sm font-medium text-charcoal underline underline-offset-4">Back to login</Link>
        </div>
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.08em] text-grey">Password reset</p>
        <h1 className="mt-3 font-[family-name:var(--font-lora)] text-[40px] font-normal text-charcoal">Reset your password.</h1>
        <p className="mt-4 text-sm leading-6 text-grey">Enter your email for a frontend demo reset. No real email will be delivered.</p>
        <form onSubmit={submit} noValidate className="mt-7">
          <label htmlFor="reset-email" className="text-sm font-medium text-charcoal">Email address
            <input id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-[#e5ded2] px-3 text-sm outline-none focus:border-charcoal" />
          </label>
          {error && <p role="alert" className="mt-2 text-xs text-[#a45645]">{error}</p>}
          <button type="submit" className="mt-5 h-12 w-full rounded-md bg-black px-5 text-sm font-medium text-white hover:bg-charcoal">Continue</button>
          {message && <p role="status" className="mt-4 text-sm text-grey">{message}</p>}
        </form>
      </div>
    </main>
  );
}
