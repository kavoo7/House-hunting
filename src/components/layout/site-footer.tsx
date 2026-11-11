import Link from "next/link";

type FooterItem = {
  label: string;
  href?: string;
};

const footerColumns: { title: string; items: FooterItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "Find a home", href: "/properties" },
      { label: "Neighbourhoods" },
      { label: "Saved homes", href: "/dashboard/favorites" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Rental guide" },
      { label: "Safety tips" },
      { label: "Help centre" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Contact us" },
    ],
  },
];

function FooterItemLink({ item }: { item: FooterItem }) {
  const className = "text-[13px] text-sand transition-colors hover:text-cream";

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {item.label}
      </Link>
    );
  }

  return <span className={className}>{item.label}</span>;
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
            <span>Privacy policy</span>
            <span>Terms of use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
