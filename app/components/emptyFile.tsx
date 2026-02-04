import { CloudUpload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudUpload />
        </EmptyMedia>
        <EmptyTitle>Ты не загрузил ещё ни одного файла!</EmptyTitle>
        <EmptyDescription>
          Загружай файлы и получи к ним доступ откуда угодно
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a href="/protected">
          <Button variant="outline" size="sm">
            Загрузить файл
          </Button>
        </a>
      </EmptyContent>
    </Empty>
  );
}
