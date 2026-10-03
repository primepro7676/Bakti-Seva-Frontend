import { NextResponse } from "next/server";
import Razorpay from "razorpay";

function getRazorpay() {
  const key_id =
    process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Missing Razorpay credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
    );
  }

  return new Razorpay({ key_id, key_secret });
}

export async function POST(req: Request) {
  try {
    const { items, customerDetails, amount } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Amount is expected to be in standard currency unit (e.g. INR),
    // Razorpay expects amount in smallest subunit (e.g. paise)
    const amountInPaise = Math.round(amount * 100);

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
