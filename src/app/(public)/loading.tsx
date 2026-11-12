import { LoadingState } from "@/components/ui/loading-state";
import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16" aria-label="Loading public page">
      <div className="mx-auto w-full max-w-[1440px]">
        <LoadingState message="Loading page" compact />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-[12px] border border-[#e5ded2] bg-white p-0 shadow-subtle">
              <Skeleton className="h-[220px] w-full" />
              <div className="flex flex-col gap-3 p-5">
                <Skeleton shape="text" className="h-6 w-32" />
                <Skeleton shape="text" className="h-5 w-4/5" />
                <Skeleton shape="text" className="h-4 w-3/5" />
                <Skeleton shape="text" className="h-4 w-2/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
