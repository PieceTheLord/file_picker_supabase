import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserData() {
  const supabase = await createClient();
  return await supabase.auth.getUser();
}
