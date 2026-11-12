import { LoadingState } from "@/components/ui/loading-state";

export default function AuthLoading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12 sm:px-10 lg:px-20" aria-label="Loading authentication page">
      <LoadingState message="Loading account page" />
    </main>
  );
}
