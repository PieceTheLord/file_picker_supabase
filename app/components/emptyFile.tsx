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
        <EmptyTitle>You have not uploaded any file yet!</EmptyTitle>
        <EmptyDescription>
          Upload files and have access to them from anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a href="/protected">
          <Button variant="outline" size="sm">
            Upload Files
          </Button>
        </a>
      </EmptyContent>
    </Empty>
  );
}
