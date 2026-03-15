import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryFilter = searchParams.category?.toLowerCase();
  const displayedProducts = categoryFilter 
    ? PRODUCTS.filter(p => p.category.toLowerCase() === categoryFilter)
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-white text-brand-black selection:bg-brand-orange pt-16 pb-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-12 mb-20">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-[#3e2723]" style={{ fontFamily: "Impact, sans-serif" }}>
              {categoryFilter ? categoryFilter : "All Gifts"}
            </h1>
            <p className="text-xl text-[#5d4037] font-medium">
              Browse our curated selection.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${!categoryFilter ? "border-brand-orange bg-brand-orange text-[#F6F5F3]" : "border-gray-300 bg-transparent text-[#3e2723] hover:border-[#3e2723]"}`}>
              All
            </Link>
            <Link href="/shop?category=Gift sets" className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${categoryFilter === 'gift sets' ? "border-brand-orange bg-brand-orange text-[#F6F5F3]" : "border-gray-300 bg-transparent text-[#3e2723] hover:border-[#3e2723]"}`}>
              Gift sets
            </Link>
            <Link href="/shop?category=Drinkware" className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${categoryFilter === 'drinkware' ? "border-brand-orange bg-brand-orange text-[#F6F5F3]" : "border-gray-300 bg-transparent text-[#3e2723] hover:border-[#3e2723]"}`}>
              Drinkware
            </Link>
            <Link href="/shop?category=Barware" className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${categoryFilter === 'barware' ? "border-brand-orange bg-brand-orange text-[#F6F5F3]" : "border-gray-300 bg-transparent text-[#3e2723] hover:border-[#3e2723]"}`}>
              Barware
            </Link>
            <Link href="/shop?category=Pen sets" className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${categoryFilter === 'pen sets' ? "border-brand-orange bg-brand-orange text-[#F6F5F3]" : "border-gray-300 bg-transparent text-[#3e2723] hover:border-[#3e2723]"}`}>
              Pen sets
            </Link>
            <Link href="/shop?category=Wine boxes" className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${categoryFilter === 'wine boxes' ? "border-brand-orange bg-brand-orange text-[#F6F5F3]" : "border-gray-300 bg-transparent text-[#3e2723] hover:border-[#3e2723]"}`}>
              Wine boxes
            </Link>
            <Link href="/shop?category=Promotional" className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${categoryFilter === 'promotional' ? "border-brand-orange bg-brand-orange text-[#F6F5F3]" : "border-gray-300 bg-transparent text-[#3e2723] hover:border-[#3e2723]"}`}>
              Promotional
            </Link>
          </div>
        </div>
        
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {displayedProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col items-center text-center">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F5F5F5] mb-6 rounded-xl">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl" />
                </div>
                
                <h3 className="font-bold text-lg leading-tight mb-2 text-[#3e2723] group-hover:text-brand-orange transition-colors">
                  {product.name}
                </h3>
                <p className="text-xl font-normal text-[#5d4037]">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center text-[#3e2723]">
            <h2 className="text-3xl font-bold mb-6">Nothing found in this drop.</h2>
            <Link href="/shop" className="text-brand-orange text-xl font-bold border-b-2 border-brand-orange hover:text-[#5d4037] transition-colors">
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
