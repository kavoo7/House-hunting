import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <header className="lg:sticky lg:top-10">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">[APP NAME]</p>
          <h1 className="mt-4 font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[52px]">Create your account</h1>
          <p className="mt-5 max-w-md font-[family-name:var(--font-inter)] text-base leading-[1.7] text-charcoal">Save homes you love and keep your Nairobi rental search organised in one place.</p>
          <p className="mt-8 font-[family-name:var(--font-inter)] text-sm text-grey">Already have an account? <Link href="/login" className="font-medium text-charcoal underline underline-offset-4">Log in</Link></p>
        </header>
        <div className="rounded-[12px] bg-white p-6 shadow-subtle sm:p-8 lg:p-10"><SignupForm /></div>
      </div>
    </main>
  );
}
