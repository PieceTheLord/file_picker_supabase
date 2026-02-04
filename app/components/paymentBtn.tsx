"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaymentBtnProps {}

export const PaymentBtn = ({}: PaymentBtnProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null); // Clear any previous errors

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment`, // Use environment variable
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payment processed:", data);
      router.push(String(data.data.confirmation.confirmation_url));
    } catch (error: any) {
      console.error("Payment processing failed:", error);
      setErrorMessage(
        error.message || "An unexpected error occurred during payment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? "Processing Payment..." : "Payment"}
      </Button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default PaymentBtn;
