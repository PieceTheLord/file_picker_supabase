import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Suspense } from "react";
import { getDictionary } from "@/lib/get-dictionary";
import { type Locale } from "@/lib/i18n-config";
import LanguageToggle from "@/components/language-toggle";

export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return <>
      <Suspense fallback={<p>{dictionary.common.loadingAuth}</p>}>
        <AuthButton />
      </Suspense>
      <div className="flex gap-x-4 items-center">
        <p className="text-2xs font-normal">{dictionary.profile.chooseTheme}</p>
        <ThemeProviderSwitcherComponent />
      </div>
      <div className="flex gap-x-4 items-center mt-4">
        <p className="text-2xs font-normal">{dictionary.profile.language}:</p>
        <LanguageToggle currentLang={lang} />
      </div>
    </>
  ;
}

// Helper to keep the ThemeSwitcher as it was but maybe renamed if needed or just use it
function ThemeProviderSwitcherComponent() {
  return <ThemeSwitcher />;
}
