"use client";
import { Button } from "@/components/ui/button";
import { Payment } from "@a2seven/yoo-checkout";
import { useRouter } from "next/navigation";

interface PaymentBtnProps {}

export const PaymentBtn = ({}: PaymentBtnProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        console.log("Payment was created!");
        try {
          const response = await fetch("http://localhost:8080/api/payment", {
            method: "POST",
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Payment processed:", data);
          return router.push(String(data.data.confirmation.confirmation_url)); // Or any relevant data you want to return
        } catch (error: any) {
          console.error("Payment processing failed:", error);
          return { error: error.message }; // Return an error object
        }
      }}
    >
      Payment
    </Button>
  );
};
export default PaymentBtn;
