import { Button } from "@/components/ui/button";
import cls from "Navbar.module.scss";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
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
