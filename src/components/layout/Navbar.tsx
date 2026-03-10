"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-black/70 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* The Logo will go here. We use an image tag with a placeholder path */}
            <div className="relative h-12 w-32 md:h-16 md:w-40">
              <Image 
                src="/logo.png" 
                alt="2Fix - Your Trusted Fix, Every Time" 
                fill 
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/shop"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Shop All
            </Link>
            <Link
              href="/shop?category=drinkware"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Drinkware
            </Link>
            <Link
              href="/shop?category=accessories"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Accessories
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
