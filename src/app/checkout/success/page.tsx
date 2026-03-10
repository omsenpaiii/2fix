"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear the cart when they successfully checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <CheckCircle2 className="h-24 w-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-extrabold text-foreground mb-4">Payment Successful!</h1>
      <p className="text-muted-foreground text-lg max-w-lg mb-8">
        Thank you for your order. We are carefully preparing your personalized gifts and will send a confirmation email shortly.
      </p>
      <Link href="/">
        <Button size="lg" className="bg-brand-black hover:bg-gray-900 text-white h-14 px-8 text-lg font-semibold">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
