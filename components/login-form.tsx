import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server"; // Use server client
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation"; // Import redirect
import { getDictionary, Locale } from "@/lib/get-dictionary";

interface LoginFormProps {
  className?: string;
  lang: Locale;
}

async function signIn(email: string, password: string) {
  "use server"; // Mark as a server action
  const supabase = await createClient();

  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message }; // Return error to the client
    }
    return redirect("/"); // Redirect on success
  } catch (error: any) {
    throw Error(error.message); // Handle unexpected errors
  }
}

export default async function LoginForm({ className, lang }: LoginFormProps) {
  const dictionary = await getDictionary(lang);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{dictionary.auth.title}</CardTitle>
          <CardDescription>Enter your email below to login to your account {lang}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* The form action is a server action that handles the sign-in process */}
          <form action={async (formData) => {
              'use server'
              const email = formData.get('email') as string;
              const password = formData.get('password') as string;
              return  await signIn(email, password);
              // if (result && result.error) {
              //     return { error: result.error };
              // }
          }}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
