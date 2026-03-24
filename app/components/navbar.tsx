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
      <a href="/tarifs">
        <Button variant="link">Tarifs</Button>
      </a>
      <a href="/">
        <Button variant="link">Files</Button>
      </a>
      <a href="/profile">
        <Button variant="link">Profile</Button>
      </a>

    </div>
  );
};
