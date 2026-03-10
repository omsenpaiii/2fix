"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [personalization, setPersonalization] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      personalization,
      image: product.image,
    });
    alert(`Added ${quantity}x ${product.name} to your cart.`);
    setPersonalization("");
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-orange pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Product Image (Glowing/Glass Frame) */}
          <div className="relative group">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-brand-orange/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 p-2 backdrop-blur-xl">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter drop-shadow-lg mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-4xl font-light tracking-wide">${product.price.toFixed(2)}</p>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-white/70 leading-relaxed font-light">
                {product.description}
              </p>

              <div>
                <h3 className="font-bold text-lg mb-3 uppercase tracking-wider">Features</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-white/80">
                      <div className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Personalization Configurator */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6 backdrop-blur-lg">
              <div>
                <label
                  htmlFor="personalization"
                  className="block text-sm font-bold uppercase tracking-widest mb-3 text-white"
                >
                  Personalization Details <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  id="personalization"
                  rows={3}
                  className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder:text-white/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none font-light"
                  placeholder="Enter name, date, or message..."
                  value={personalization}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPersonalization(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <label htmlFor="quantity" className="block text-sm font-bold uppercase tracking-widest mb-3 text-white">
                    Qty
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    className="w-full h-16 bg-black/40 border-white/20 text-xl font-bold rounded-xl text-center focus:border-brand-orange border"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value) || 1)}
                  />
                </div>
                
                <div className="flex-1 flex items-end">
                  <Button 
                    onClick={handleAddToCart} 
                    disabled={!personalization.trim()}
                    className="w-full h-16 bg-brand-orange hover:bg-[#ff9c45] text-black font-black uppercase tracking-widest text-lg rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,133,27,0.3)] hover:shadow-[0_0_30px_rgba(255,133,27,0.6)] disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100"
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
