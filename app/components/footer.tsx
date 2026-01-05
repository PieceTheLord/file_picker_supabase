import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs py-16">
      <div className="flex items-center">
        <p className="text-[14px] font-thin">Chose your theme:</p>
        <ThemeSwitcher />
      </div>
      <p className="text-[14px] font-thin">ИНН(INN) - 312823638291</p>
    </footer>
  );
}
