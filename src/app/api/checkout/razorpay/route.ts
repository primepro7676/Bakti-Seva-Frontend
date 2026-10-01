import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize razorpay
// using fallback dummy keys for dev if env is missing
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_dummy_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret_key",
});

export async function POST(req: Request) {
  try {
    const { items, customerDetails, amount } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Amount is expected to be in standard currency unit (e.g. INR),
    // Razorpay expects amount in smallest subunit (e.g. paise)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save initial order status in database if needed
    // For now we just return the order details to the client to initialize payment
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
