# End-to-end tests

Run the Chromium suite with:

```sh
npm run test:e2e
```

The suite starts the existing Next.js development server on `127.0.0.1:3100`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` if Chrome/Chromium is installed somewhere other than `/usr/bin/google-chrome`.

Use `npm run test:e2e -- --project=chromium-desktop` to run only desktop tests, or `npm run test:e2e:ui` to use Playwright UI mode. HTML results are written to `playwright-report/`; traces, videos and failure screenshots are written to `test-results/`.

For machine-readable output, set `PLAYWRIGHT_JSON_REPORT=test-results/report.json npm run test:e2e:json`. Local runs use two workers by default; CI uses one.

Each test uses a new browser context. Signup uses a synthetic address and test-only profile. Avoid adding tests that confirm deletion, mutate seeded user roles, or change persistent demo settings.
