import { checkout } from '@/app/payments/Payments';
import { ICreatePayment } from '@a2seven/yoo-checkout';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {

  const idempotenceKey = uuidv4();
  console.log("Payment request initiated with idempotency key:", idempotenceKey); // Added logging

  const createPayload: ICreatePayment = {
    amount: {
      value: '2.00',
      currency: 'RUB'
    },
    payment_method_data: {
      type: 'bank_card',

    },
    confirmation: {
      type: 'redirect',
      return_url: 'http://localhost:8080'
    }
  };

  try {
    const payment = await checkout.createPayment(createPayload, idempotenceKey);
    console.log("Payment creation successful:", payment); // Added logging
    return NextResponse.json({ data: payment })
  } catch (error) {
    console.error("Payment creation failed:", error); // Improved error logging
    return NextResponse.error(); // Or return a more informative error response
  }
}
