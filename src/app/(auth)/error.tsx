"use client";

import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/ui/error-state";

type AuthErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AuthError({ reset }: AuthErrorProps) {
  const router = useRouter();

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12 sm:px-10 lg:px-20">
      <div className="w-full max-w-xl">
        <ErrorState
          context="content"
          title="We could not open this account page."
          description="Please try again, or return to the homepage and continue browsing homes."
          onRetry={reset}
          action={{ label: "Back to homepage", onClick: () => router.push("/") }}
        />
      </div>
    </main>
  );
}
