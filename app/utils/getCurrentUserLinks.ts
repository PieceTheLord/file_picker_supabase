import { createClient } from "@/lib/supabase/server";


/**
 * Retireve all user's uploaded files' link
 * @param email user's email
 * @returns all user's uploaded files' link
 */
export async function getCurrentUserLinks(email: string) {
  const supabase = await createClient();
  return supabase
    .from(process.env.SUPABASE_DATABASE_FILES_ID!)
    .select("*")
    .eq("user_email", email);
}

