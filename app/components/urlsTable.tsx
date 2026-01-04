import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { formatLocalTime } from "../utils/formatDate";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Link {
  id: number;
  file_name: string;
  signedURL: string;
  expires_at: string;
}

export async function URLsTable({ links }: { links: Link[] }) {
  return (
    <Table>
      <TableCaption>The list of your uploaded files </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">file name</TableHead>
          <TableHead className="">link (download)</TableHead>
          <TableHead className="text-right">expires_at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links!.map((link) => (
          <TableRow key={link.id}>
            <TableCell className="font-medium text-left" key={link.file_name}>
              {link.file_name.split("-").slice(1).join("").slice(0, 25) +
                ". . ."}
            </TableCell>
            <TableCell className="font-medium text-left" key={link.signedURL}>
              <a href={link.signedURL}>{link.signedURL.slice(0,25)}</a>
            </TableCell>
            <TableCell className="text-right" key={link.expires_at}>
              {formatLocalTime(link.expires_at)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
