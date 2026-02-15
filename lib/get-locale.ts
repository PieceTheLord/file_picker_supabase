import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { i18n } from "./i18n-config";
import { match } from "@formatjs/intl-localematcher";

export function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = Array.from(i18n.locales);

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as string[], //fix:  change locales type to string[]
  );

  const locale = match(languages, locales, i18n.defaultLocale);

  return locale;
}