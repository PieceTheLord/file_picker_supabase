"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { i18n, type Locale } from "@/lib/i18n-config";

export default function LanguageToggle({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "ru" : "en";
    router.push(redirectedPathname(nextLang));
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage}>
      {currentLang === "en" ? "RU" : "EN"}
    </Button>
  );
}
