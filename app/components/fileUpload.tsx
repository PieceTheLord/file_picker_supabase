"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  files: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(2, "Please select up to 2 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});

type FormValues = z.infer<typeof formSchema>;

async function uploadFile(file: File) {
  const supabase = createClient();
  const formData = new FormData();
  formData.append("file", file);
  // const links = supabase
  try {
    const response = await fetch("/api/upload_file", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Upload successful:", data);
      return data; // Or return the URL, etc.
    } else {
      console.error("Upload failed:", response.statusText);
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

export function FileUploadFormDemo() {
  const maxUploadFiles = 1;
  const maxFileMeomory = 5; // Mb
  const router = useRouter();
  const [Loading, setLoading] = React.useState<boolean>(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = React.useCallback(
    async (data: FormValues) => {
      try {
        // Upload each file
        setLoading(true)
        const uploadPromises = data.files.map((file) => uploadFile(file));
        const uploadResults = await Promise.all(uploadPromises);

        toast("Files uploaded successfully!", {
          description: (
            <pre className="mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground">
              <code>
                {JSON.stringify(
                  uploadResults.map((result, index) => ({
                    filename: data.files[index].name,
                    result,
                  })),
                  null,
                  2,
                )}
              </code>
            </pre>
          ),
        });
      } catch (error: any) {
        toast.error("File upload failed", {
          description: error.message || "An error occurred during upload.",
        });
      } finally {
        form.reset();
        router.push("/");
        setLoading(false)
      }
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onValueChange={field.onChange}
                  // accept={`image/*,.pdf,.doc,.*`}
                  maxFiles={maxUploadFiles}
                  maxSize={maxFileMeomory * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError("files", {
                      message,
                    });
                  }}
                  multiple
                >
                  <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                    <CloudUpload className="size-4" />
                    Drag and drop or
                    <FileUploadTrigger asChild>
                      <Button variant="link" size="sm" className="p-0">
                        choose files
                      </Button>
                    </FileUploadTrigger>
                    to upload
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value?.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <X />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>
                Upload up to {maxUploadFiles} images up to 5MB each.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          {Loading ? "Loading . . ." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
