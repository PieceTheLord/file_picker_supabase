import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./lib/i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";

export function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") || "";
  const languages = accept
    .split(",")
    .map((s) => s.split(";")[0].trim())
    .filter(Boolean);

  const locales = Array.from(i18n.locales);
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  // Session check: call server-side route so we don't import server-only
  // code into Edge middleware.
  try {
    // Only check sessions for protected paths
    if (
      pathname !== "/" &&
      !pathname.startsWith("/login") &&
      !pathname.startsWith("/auth")
    ) {
      const sessionRes = await fetch(new URL("/api/session", request.url), {
        headers: { cookie: request.headers.get("cookie") || "" },
      });

      if (sessionRes.ok) {
        const { authenticated } = await sessionRes.json();
        if (!authenticated) {
          const locale = getLocale(request);
          const url = request.nextUrl.clone();
          url.pathname = `/${locale}/auth/login`;
          return NextResponse.redirect(url);
        }
      }
    }
  } catch {
    // On error, fall through to next() — avoid breaking the request.
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
