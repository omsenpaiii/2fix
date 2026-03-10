"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

// In a real app, we'd fetch these from a database.
const PRODUCTS = {
  "prod_mug_21": {
    id: "prod_mug_21",
    name: "Personalised 21st Birthday Glass Mug",
    price: 35.0,
    image: "/placeholder-mug.png",
    description: "Celebrate the big 21 with a personalized glass mug. Perfect for that special milestone. High quality engraving ensures your message lasts a lifetime.",
    features: ["Holds 500ml", "Dishwasher safe", "Laser engraved"],
  },
  "prod_wallet_set": {
    id: "prod_wallet_set",
    name: "Premium Leather Wallet & Pen Gift Set",
    price: 85.0,
    image: "/placeholder-wallet.png",
    description: "The ultimate corporate or personal gift. A genuine leather wallet and smooth-writing ballpoint pen, both personalized to your specifications.",
    features: ["Genuine Leather", "Multiple card slots", "Premium smooth ink pen"],
  },
  "prod_flask": {
    id: "prod_flask",
    name: "Engraved Stainless Steel Flask",
    price: 45.0,
    image: "/placeholder-flask.png",
    description: "A classy and durable stainless steel flask, ideal for weddings, groomsmen, or special events.",
    features: ["Stainless Steel 8oz", "Leak-proof cap", "Deep laser engraving"],
  },
  "prod_bottle": {
    id: "prod_bottle",
    name: "Custom Insulated Water Bottle",
    price: 40.0,
    image: "/placeholder-bottle.png",
    description: "Keep drinks cold for up to 24 hours or hot for 12. Add a name or fun message to make it truly theirs.",
    features: ["Premium Insulation", "Eco-friendly", "Custom wide-mouth"],
  },
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id as keyof typeof PRODUCTS];
  const [personalizationText, setPersonalizationText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold">Product not found.</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!personalizationText.trim()) {
      alert("Please enter personalization text");
      return;
    }
    
    addItem({
      id: `${product.id}-${personalizationText}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      personalization: {
        text: personalizationText,
      },
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image Gallery Placeholder */}
        <div className="relative aspect-square rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border">
           <Image 
             src={product.image}
             alt={product.name}
             fill 
             className="object-cover opacity-10"
           />
           <span className="z-10 text-muted-foreground text-lg">{product.name} Placeholder</span>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-brand-orange">
              ${product.price.toFixed(2)} AUD
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <ul className="list-disc list-inside text-sm text-foreground space-y-1">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          {/* Personalization Form */}
          <div className="pt-6 border-t space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Personalization Details</label>
              <textarea 
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                placeholder="Enter names, dates, or messages to engrave..."
                rows={3}
                value={personalizationText}
                onChange={(e) => setPersonalizationText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Please double check spelling before submitting.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100"
                >-</button>
                <div className="px-4 py-2 font-medium">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100"
                >+</button>
              </div>

              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className={`flex-1 h-12 text-lg font-semibold transition-all ${
                  added ? "bg-green-600 hover:bg-green-700 text-white" : "bg-brand-black hover:bg-gray-900 text-white"
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
