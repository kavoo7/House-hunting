"use client";

import { FormEvent, useEffect, useState } from "react";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const passwordRequirements = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "One lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One special character", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

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

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Enter your phone number.";
  else if (!/^\+?[0-9\s()-]{7,}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (!passwordRequirements.every((requirement) => requirement.test(values.password))) errors.password = "Your password does not meet all the requirements.";
  if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords must match.";
  return errors;
}

export function SignupForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [resendCountdown, setResendCountdown] = useState(60);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  useEffect(() => {
    if (resendCountdown === 0) {
      return;
    }

    const countdownInterval = window.setInterval(() => {
      setResendCountdown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(countdownInterval);
  }, [resendCountdown]);

  function handleResendCode() {
    setResendCountdown(60);
  }

  function handleVerifyEmail() {
    if (!values.email.trim()) {
      setErrors((current) => ({ ...current, email: "Enter your email address first." }));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      setErrors((current) => ({ ...current, email: "Enter a valid email address." }));
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      setFormMessage("Enter the six-digit demo code to continue.");
      return;
    }

    setIsVerificationStep(false);
    setFormMessage("Demo step complete: continue with your account details. No email was verified.");
  }

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setResendCountdown(60);
      setFormMessage("");
      setIsVerificationStep(true);
    } else {
      setFormMessage("Please review the highlighted fields.");
    }
  }

  return (
    <div className="space-y-8">
      {isVerificationStep && (
        <section className="rounded-[12px] border border-[#e5ded2] bg-[#fbfaf7] p-5" aria-labelledby="verification-heading">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-grey">STEP 1 OF 2 · DEMO VERIFICATION</p>
          <h2 id="verification-heading" className="mt-2 font-[family-name:var(--font-lora)] text-[24px] font-normal text-charcoal">Verify your email first</h2>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-xs leading-[1.6] text-grey">This is a visual demonstration only. No code is sent and verification does not create an account.</p>
          <label htmlFor="verificationEmail" className="mt-4 block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Email address</label>
          <input id="verificationEmail" type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} className="mt-2 h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
          <label htmlFor="verificationCode" className="mt-4 block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Six-digit code</label>
          <input id="verificationCode" value={verificationCode} onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" maxLength={6} pattern="[0-9]{6}" placeholder="000000" className="mt-2 h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 text-center font-[family-name:var(--font-inter)] text-lg tracking-[0.35em] text-charcoal outline-none focus:border-charcoal" />
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button type="button" onClick={handleVerifyEmail} className="rounded-md bg-black px-4 py-2.5 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal">Continue to account details</button>
            <button type="button" onClick={handleResendCode} disabled={resendCountdown > 0} className="font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal underline underline-offset-4 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50">
              {resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : "Resend code"}
            </button>
          </div>
          <button type="button" onClick={() => { setIsVerificationStep(false); setFormMessage(""); }} className="mt-4 font-[family-name:var(--font-inter)] text-sm text-grey underline underline-offset-4">Back to registration</button>
          {formMessage && <p role="status" className="mt-3 text-sm text-grey">{formMessage}</p>}
        </section>
      )}

      {!isVerificationStep && <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Create your account">
        <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#e5ded2] bg-white font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal hover:bg-[#fbfaf7]">
          <GoogleIcon />
          Continue with Google
        </button>
        <div className="flex items-center gap-4 text-xs text-grey"><span className="h-px flex-1 bg-[#e5ded2]" />or<span className="h-px flex-1 bg-[#e5ded2]" /></div>

        <div><label htmlFor="fullName" className="block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Full name</label><input id="fullName" value={values.fullName} onChange={(event) => updateValue("fullName", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} className="mt-2 h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />{errors.fullName && <p id="fullName-error" className="mt-1 text-xs text-red-700">{errors.fullName}</p>}</div>
        <div><label htmlFor="email" className="block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Email address</label><input id="email" type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className="mt-2 h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />{errors.email && <p id="email-error" className="mt-1 text-xs text-red-700">{errors.email}</p>}</div>
        <div><label htmlFor="phone" className="block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Phone number</label><input id="phone" type="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} autoComplete="tel" placeholder="+254 700 000 000" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className="mt-2 h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />{errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-700">{errors.phone}</p>}</div>

        <div>
          <label htmlFor="password" className="block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Password</label>
          <div className="relative mt-2">
            <input id="password" type={showPassword ? "text" : "password"} value={values.password} onChange={(event) => updateValue("password", event.target.value)} autoComplete="new-password" aria-invalid={Boolean(errors.password)} aria-describedby="password-requirements password-error" className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 pr-12 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" />
            <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-grey" aria-label={showPassword ? "Hide password" : "Show password"}><EyeIcon hidden={!showPassword} /></button>
          </div>
          <ul id="password-requirements" className="mt-3 grid gap-1 text-xs text-grey sm:grid-cols-2">
            {passwordRequirements.map((requirement) => {
              const met = requirement.test(values.password);
              return <li key={requirement.label} className={met ? "text-green-700" : ""}>{met ? "✓" : "○"} {requirement.label}</li>;
            })}
          </ul>
          {errors.password && <p id="password-error" className="mt-1 text-xs text-red-700">{errors.password}</p>}
        </div>

        <div><label htmlFor="confirmPassword" className="block font-[family-name:var(--font-inter)] text-sm font-medium text-charcoal">Confirm password</label><div className="relative mt-2"><input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={values.confirmPassword} onChange={(event) => updateValue("confirmPassword", event.target.value)} autoComplete="new-password" aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined} className="h-12 w-full rounded-md border border-[#e5ded2] bg-white px-3 pr-12 font-[family-name:var(--font-inter)] text-sm text-charcoal outline-none focus:border-charcoal" /><button type="button" onClick={() => setShowConfirmPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-grey" aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}><EyeIcon hidden={!showConfirmPassword} /></button></div>{errors.confirmPassword && <p id="confirmPassword-error" className="mt-1 text-xs text-red-700">{errors.confirmPassword}</p>}</div>

        <button type="submit" className="h-12 w-full rounded-md bg-black px-5 font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Create account</button>
        {formMessage && <p role="status" className="text-sm text-grey">{formMessage}</p>}
      </form>}
    </div>
  );
}
