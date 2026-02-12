import { Button } from "@/components/ui/button";
import { type Locale } from "@/lib/i18n-config";
import Link from "next/link";

interface NavbarProps {
  lang: Locale;
}

export const Navbar = ({ lang }: NavbarProps) => {
  const isRu = lang === "ru";

  return (
    <div className="flex justify-center w-full">
      <Link href={`/${lang}/tarifs`}>
        <Button variant="link">{isRu ? "Тарифы" : "Tariffs"}</Button>
      </Link>
      <Link href={`/${lang}`}>
        <Button variant="link">{isRu ? "Файлы" : "Files"}</Button>
      </Link>
      <Link href={`/${lang}/profile`}>
        <Button variant="link">{isRu ? "Профиль" : "Profile"}</Button>
      </Link>
    </div>
  );
};
