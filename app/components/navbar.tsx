import { Button } from "@/components/ui/button";
import cls from "Navbar.module.scss";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <div className="flex justify-center w-full">
      <a href="/tarifs">
        <Button variant="link">Тарифы</Button>
      </a>
      <a href="/">
        <Button variant="link">Фалы</Button>
      </a>
      <a href="/profile">
        <Button variant="link">Профиль</Button>
      </a>

    </div>
  );
};
