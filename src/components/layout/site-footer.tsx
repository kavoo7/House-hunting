import Link from "next/link";

type FooterItem = {
  label: string;
  href: string;
};

const footerColumns: { title: string; items: FooterItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "Find a home", href: "/properties" },
      { label: "Neighbourhoods", href: "/neighbourhoods" },
      { label: "Saved homes", href: "/dashboard/favorites" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Rental guide", href: "/guide" },
      { label: "Safety tips", href: "/guide#before-payment-heading" },
      { label: "Help centre", href: "/help" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

function FooterItemLink({ item }: { item: FooterItem }) {
  return <Link href={item.href} className="inline-flex cursor-pointer text-[13px] text-sand transition-colors hover:text-cream focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{item.label}</Link>;
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal px-6 pb-8 pt-12 sm:px-10 lg:px-20" aria-label="Site footer">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[180px_minmax(280px,1fr)_repeat(3,140px)] lg:gap-8">
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-inter)] text-2xl font-bold tracking-[-0.02em] text-cream"
            >
              [APP NAME]
              <span className="sr-only"> home</span>
            </Link>
          </div>

          <div className="lg:pl-[50px]">
            <p className="font-[family-name:var(--font-inter)] text-base text-cream">
              A better place to start your next chapter.
            </p>
            <p className="mt-2 font-[family-name:var(--font-inter)] text-[13px] text-sand">
              Rental homes. Local insight. Less guesswork.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="w-full lg:max-w-[140px]">
              <h2 className="font-[family-name:var(--font-inter)] text-sm font-semibold text-white">
                {column.title}
              </h2>
              <nav aria-label={`${column.title} links`} className="mt-3 flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <FooterItemLink key={item.label} item={item} />
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 font-[family-name:var(--font-inter)] text-xs text-sand sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 [APP NAME]. Nairobi, Kenya.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="inline-flex min-h-8 items-center px-1 text-sand cursor-pointer underline-offset-4 hover:text-cream hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Privacy policy</Link>
            <Link href="/terms" className="inline-flex min-h-8 items-center px-1 text-sand cursor-pointer underline-offset-4 hover:text-cream hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
