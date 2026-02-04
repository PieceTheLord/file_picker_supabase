import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Check, ShieldCheck, Lock, EyeOff, ClipboardList, CircleSlash } from "lucide-react";

const PricingSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-4">
      {/* Anonymous (Free Tier) */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-4xl">Анонимный</CardTitle>
          <CardDescription>Для быстрой и безопасной передачи файлов.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="text-4xl font-bold">$0 / мес</div>
          <ul className="text-xl">
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Макс. размер файла: 50 МБ</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Срок действия файла: 24 часа</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Лимит загрузок: 3 на файл</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Стандартное шифрование</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> "Работает на Expire.link"</li>
          </ul>
        </CardContent>
        <CardFooter className="justify-center items-start h-full ">
          <Button className=" cursor-default hover:bg-primary/0 py-2 px-6 text-2xs" variant={"outline"}>
            Активный
          </Button>
        </CardFooter>
      </Card>

      {/* Agent (Pro Tier) */}
      <Card className="border-2 border-primary shadow-lg">
        <CardHeader className="relative">
          <CardTitle className="text-4xl">Агент</CardTitle>
          <CardDescription>Для опытных пользователей и фрилансеров.</CardDescription>
          <Badge variant="default" className="bg-green-500 shadow-2xl text-2xs text-white w-[100px] text-center flex justify-center absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full h-[100px]   hover:bg-green-500">Популярный</Badge>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="text-4xl font-bold">$5 / мес <span className="text-sm">или $49 навсегда</span></div>
          <ul className="text-xl">
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Макс. размер файла: 2 ГБ</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Срок действия файла: 7 дней</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Неограниченное количество загрузок</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Защита паролем</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> "Удалить после прочтения"</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Журналы доступа</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Без брендинга</li>
          </ul>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild>
            <a href="/checkout">Перейти на Agent</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingSection;
