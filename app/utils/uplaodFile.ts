import { createClient } from "@/lib/supabase/server";

/**
 * Upload a file into SupaBase storage
 * @param bucketName bucket name
 * @param fileBuffer file converted to array buffer
 * @param filePath path to the file starts from the bucket name
 * @param file_type file type e.g. .svg
 */
export async function uploadFile(
  bucketName: string,
  fileBuffer: ArrayBuffer,
  filePath: string,
  file_type: string,
) {
  const supabase = await createClient();

  const res = await supabase.storage
    .from(bucketName)
    .upload(filePath, fileBuffer, {
      contentType: file_type,
      upsert: false,
    });
  return res;
}
