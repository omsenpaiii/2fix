"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <XCircle className="h-24 w-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-extrabold text-foreground mb-4">Payment Cancelled</h1>
      <p className="text-muted-foreground text-lg max-w-lg mb-8">
        Your payment was canceled and no charges were made. You can safely return to your cart and try again when you are ready.
      </p>
      <Link href="/cart">
        <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold">
          Return to Cart
        </Button>
      </Link>
    </div>
  );
}
