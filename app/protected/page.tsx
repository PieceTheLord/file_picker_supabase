import { FileUploadFormDemo } from "../components/fileUpload";
import { Button } from "@/components/ui/button";
import { handlePayment } from "../payments/HandlePayment";
import { Suspense } from "react";
import PaymentBtn from "../components/paymentBtn";

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <a href="/">
          <Button>Back</Button>
        </a>
        <FileUploadFormDemo></FileUploadFormDemo>
        <Suspense>
          <PaymentBtn/>
        </Suspense>
      </div>
    </div>
  );
}
