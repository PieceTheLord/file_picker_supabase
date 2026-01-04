"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverCopy({ link }: { link: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(link);
            } catch (err) {
              console.error("Failed to copy text: ", err);
            }
          }}
        >
          Copy Link
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="">Copied!</div>
      </PopoverContent>
    </Popover>
  );
}
