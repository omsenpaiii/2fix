"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component's render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId } = await res.json();
      const stripe = await stripePromise;
      if (stripe && sessionId) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error redirecting to checkout", error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added any personalized gifts yet.</p>
        <Link href="/shop">
          <Button size="lg" className="bg-brand-orange hover:bg-orange-600">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 border rounded-xl p-4 bg-white shadow-sm">
              <div className="relative h-24 w-24 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover opacity-20" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                <p className="text-brand-orange font-medium">${item.price.toFixed(2)} AUD</p>
                <div className="mt-2 text-sm text-muted-foreground bg-gray-50 p-2 rounded-md border">
                  <strong>Personalization:</strong> {item.personalization.text}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100">-</button>
                  <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100">+</button>
                </div>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border h-fit sticky top-28">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${totalPrice().toFixed(2)} AUD</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice().toFixed(2)} AUD</span>
            </div>
          </div>
          <Button 
            onClick={handleCheckout} 
            disabled={loading}
            className="w-full bg-brand-black hover:bg-gray-900 text-white h-12 text-lg font-semibold"
          >
            {loading ? "Processing..." : "Checkout with Stripe"}
          </Button>
        </div>
      </div>
    </div>
  );
}
