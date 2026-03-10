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
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-orange pt-16 pb-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,133,27,0.3)]">
              {categoryFilter ? `${categoryFilter} Gifts` : "All Gifts"}
            </h1>
            <p className="text-2xl text-white/60 font-medium">
              Browse our curated selection.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/shop" className={`px-6 py-3 rounded-full font-bold border-2 transition-all ${!categoryFilter ? "border-brand-orange bg-brand-orange text-black" : "border-white/20 bg-white/5 text-white hover:bg-white/10"}`}>
              All
            </Link>
            <Link href="/shop?category=drinkware" className={`px-6 py-3 rounded-full font-bold border-2 transition-all ${categoryFilter === 'drinkware' ? "border-brand-orange bg-brand-orange text-black" : "border-white/20 bg-white/5 text-white hover:bg-white/10"}`}>
              Drinkware
            </Link>
            <Link href="/shop?category=accessories" className={`px-6 py-3 rounded-full font-bold border-2 transition-all ${categoryFilter === 'accessories' ? "border-brand-orange bg-brand-orange text-black" : "border-white/20 bg-white/5 text-white hover:bg-white/10"}`}>
              Accessories
            </Link>
          </div>
        </div>
        
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {displayedProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white/[0.03] hover:bg-white/10 border border-white/10 rounded-[2.5rem] p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,133,27,0.15)] backdrop-blur-xl">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-black/60 mb-6">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="flex-1 flex flex-col justify-between px-2">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-brand-orange uppercase mb-2 block">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-xl leading-tight mb-2 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-2xl font-black">${product.price.toFixed(2)}</p>
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-black transition-colors">
                      <span className="font-bold text-xl">+</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <h2 className="text-3xl font-bold mb-6">Nothing found in this drop.</h2>
            <Link href="/shop" className="text-brand-orange text-xl font-bold border-b-2 border-brand-orange hover:text-white transition-colors">
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
