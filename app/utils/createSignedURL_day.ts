import { createClient } from "@/lib/supabase/server";

/**
 * Create a link to download a file from the SupaBase storage
 * @param path path to the file
 * @param bucketName name of the bucket
 * @param fileName file name
 * @returns URL to download the file and error if it is
 */
export async function createSignedURL_day(path: string, bucketName: string, fileName: string) {
  const supabase = await createClient();

  const link = await supabase.storage
    .from(bucketName)
    .createSignedUrl(path, 24 * 60 * 60, {
      download: fileName,
    });
  return link;
}
