import { createClient } from "@/lib/supabase/server";

/**
 * create a row in database about file path and its expiration time
 * @param path path to the file in Supabase storage
 * @param file_name file name
 */
export async function insertFileDetails(path: string, file_name: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const insertLink = await supabase
    .from(process.env.SUPABASE_DATABASE_FILES_ID!)
    .insert({
      user_id: user?.id,
      user_email: user?.email,
      expires_at: expiresAt.toISOString(),
      path: path,
      file_name: file_name,
    });
  return insertLink;
}
