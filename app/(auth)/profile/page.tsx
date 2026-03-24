import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense>
        <AuthButton />
      </Suspense>
    </>
  );
}
