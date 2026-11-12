import { LoadingState } from "@/components/ui/loading-state";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="min-h-[70vh] bg-cream px-6 py-8 sm:px-10 lg:px-12" aria-label="Loading dashboard">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden rounded-[12px] bg-white p-5 shadow-subtle md:block" aria-label="Loading dashboard navigation">
          <Skeleton shape="text" className="h-6 w-28" />
          <div className="mt-8 flex flex-col gap-4">
            <Skeleton shape="text" className="h-4 w-full" />
            <Skeleton shape="text" className="h-4 w-4/5" />
            <Skeleton shape="text" className="h-4 w-3/4" />
            <Skeleton shape="text" className="h-4 w-5/6" />
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Skeleton shape="text" className="h-9 w-56 sm:w-72" />
              <Skeleton shape="text" className="mt-3 h-4 w-64 sm:w-80" />
            </div>
            <Skeleton shape="circle" className="size-10" />
          </div>
          <LoadingState message="Loading dashboard" compact className="mt-6" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="rounded-[12px] bg-white p-5 shadow-subtle">
                <Skeleton className="h-32 w-full" />
                <Skeleton shape="text" className="mt-4 h-5 w-3/4" />
                <Skeleton shape="text" className="mt-3 h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
