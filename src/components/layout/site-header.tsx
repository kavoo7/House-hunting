import Link from "next/link";

const navigationLinks = [
  { href: "/properties", label: "Find a home" },
  { href: "/#neighbourhoods", label: "Neighbourhoods" },
  { href: "/#how-it-works", label: "How it works" },
];

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="bg-page">
      <div className="mx-auto flex min-h-20 w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold tracking-[0.12em] text-primary-text"
        >
          [APP NAME]
          <span className="sr-only"> home</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-9 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-primary-text transition-colors hover:text-secondary-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="/dashboard/favorites"
            className="flex items-center gap-2 text-sm font-medium text-primary-text transition-colors hover:text-secondary-text"
          >
            <HeartIcon />
            Saved homes
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-primary-text transition-colors hover:text-secondary-text"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-pill bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal"
          >
            Sign up
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-primary-text [&::-webkit-details-marker]:hidden">
            Menu
            <span aria-hidden="true" className="text-base leading-none">+</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 z-10 mt-3 flex w-64 flex-col gap-1 rounded-lg bg-surface p-3 shadow-card"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-page"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard/favorites"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-page"
            >
              <HeartIcon />
              Saved homes
            </Link>
            <Link
              href="/login"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-primary-text hover:bg-page"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="mt-2 rounded-pill bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-charcoal"
            >
              Sign up
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
