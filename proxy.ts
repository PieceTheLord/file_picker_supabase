import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, Locale } from "./lib/i18n-config";
import { createServerClient } from "@supabase/ssr";
import { hasEnvVars } from "./lib/utils";
import { createClient } from "./lib/supabase/server";
import { updateSession } from "./lib/supabase/proxy";
import { getLocale } from "./lib/get-locale";



export async function proxy(request: NextRequest) {
  //i18n implementation

  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale: Locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    request.nextUrl.pathname = `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`
    return updateSession(request)
  }
  return updateSession(request)
  // IMPORTANT: You *must* return the supabaseResponse object as it is.
}


export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - api routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
