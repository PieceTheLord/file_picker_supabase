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
import { CircleCheck, CircleX } from "lucide-react";
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
              {link.file_name.length > 25
                ? link.file_name.slice(0, 25) + ". . ."
                : link.file_name}
            </TableCell>
            <TableCell
              className="font-medium text-left flex justify-center items-center gap-8"
              key={link.signedURL}
            >
              {new Date(link.expires_at) > new Date() ? (
                <>
                  <a href={link.signedURL}>
                    <Button>Download</Button>
                  </a>
                  <Suspense fallback="loading CSR">
                    <PopoverCopy link={link.signedURL} />
                  </Suspense>
                </>
              ) : (
                <p>Unavailable to download</p>
              )}
            </TableCell>
            <TableCell className="text-left" key={link.expires_at}>
              {formatLocalTime(link.expires_at)}
            </TableCell>
            <TableCell className="flex justify-end " key={link.created_at}>
              {new Date(link.expires_at) > new Date() ? (
                <CircleCheck />
              ) : (
                <CircleX />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
