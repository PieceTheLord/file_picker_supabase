import { FileUploadFormDemo } from "@/app/components/fileUpload";
import { Button } from "@/components/ui/button";

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <a href="/">
          <Button>Back</Button>
        </a>
        <FileUploadFormDemo></FileUploadFormDemo>
        {/* 
        // * Yookassa in state of choosing 
        <Suspense>
          <PaymentBtn/>
        </Suspense> */}
      </div>
    </div>
  );
}
