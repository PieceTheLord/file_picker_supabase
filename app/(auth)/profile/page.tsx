import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Suspense } from "react";

export default function Page() {
  return <>
      <Suspense>
        <AuthButton />
      </Suspense>
      <div className="flex gap-x-4 items-center">
        <p className="text-2xs font-normal">Выбери тему:</p>
        <ThemeSwitcher />
      </div>
    </>
  ;
}
