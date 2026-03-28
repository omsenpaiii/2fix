"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/lib/productStore";
import { useCartStore } from "@/lib/store";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [personalization, setPersonalization] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { products } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${personalization}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      personalization: {
        text: personalization
      },
      image: product.image,
    });
    alert(`Added ${quantity}x ${product.name} to your cart.`);
    setPersonalization("");
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white text-brand-black selection:bg-brand-orange pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Product Image */}
          <div className="relative group">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-[#F5F5F5] border border-gray-200 p-2">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#EAEAEA]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Details & Config */}
          <div className="flex flex-col space-y-10">
            <div>
              <p className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-[#3e2723] mb-4 leading-tight" style={{ fontFamily: "Impact, sans-serif" }}>
                {product.name}
              </h1>
              <p className="text-4xl font-normal text-[#5d4037]">${product.price.toFixed(2)}</p>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#5d4037] leading-relaxed font-medium">
                {product.description}
              </p>

              <div>
                <h3 className="font-bold text-lg mb-3 uppercase tracking-wider text-[#3e2723]">Features</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-[#5d4037] font-medium">
                      <div className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Personalization Configurator */}
            <div className="bg-[#F6F5F3] border border-gray-200 rounded-[2rem] p-8 space-y-6">
              <div>
                <label
                  htmlFor="personalization"
                  className="block text-sm font-bold uppercase tracking-widest mb-3 text-[#3e2723]"
                >
                  Personalization Details <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  id="personalization"
                  rows={3}
                  className="w-full bg-white border border-gray-300 rounded-xl p-4 text-[#3e2723] placeholder:text-gray-400 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none font-medium"
                  placeholder="Enter name, date, or message..."
                  value={personalization}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPersonalization(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <label htmlFor="quantity" className="block text-sm font-bold uppercase tracking-widest mb-3 text-[#3e2723]">
                    Qty
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    className="w-full h-16 bg-white border-gray-300 text-[#3e2723] text-xl font-bold rounded-xl text-center focus:border-brand-orange border"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value) || 1)}
                  />
                </div>
                
                <div className="flex-1 flex items-end">
                  <Button 
                    onClick={handleAddToCart} 
                    disabled={!personalization.trim()}
                    className="w-full h-16 bg-[#3e2723] hover:bg-brand-orange text-[#F6F5F3] font-black uppercase tracking-widest text-lg rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {personalization.trim() ? "Add to Cart" : "Enter Details to Add"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
