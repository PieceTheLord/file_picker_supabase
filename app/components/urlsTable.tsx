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
import { formatLocalTime } from "../utils/formatDate";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Suspense } from "react";
import React from "react";
import { PopoverCopy } from "./popover";

interface Link {
  id: number;
  file_name: string;
  signedURL: string;
  expires_at: string;
  created_at: string;
}

export async function URLsTable({ links }: { links: Link[] }) {
  return (
    <Table>
      <TableCaption>The list of your uploaded files </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>file name</TableHead>
          <TableHead></TableHead>
          <TableHead>expires_at</TableHead>
          <TableHead className="text-right">Available</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links!.map((link) => (
          <TableRow key={link.id}>
            <TableCell className="font-medium text-left" key={link.file_name}>
              {link.file_name.split("-").slice(1).join("").slice(0, 25) +
                ". . ."}
            </TableCell>
            <TableCell className="font-medium text-left flex justify-center items-center gap-8" key={link.signedURL}>
              <a href={link.signedURL}>
                <Button>Download</Button>
              </a>
              <Suspense fallback="loading CSR">
                <PopoverCopy link={link.signedURL} />
              </Suspense>
            </TableCell>
            <TableCell className="text-left" key={link.expires_at}>
              {formatLocalTime(link.expires_at)}
            </TableCell>
            <TableCell
              className="flex justify-center items-center "
              key={link.created_at}
            >
              <CircleCheck />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
