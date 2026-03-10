import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";

// Function to get the first 4 products for showcase
const featuredProducts = PRODUCTS.slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-white selection:bg-brand-orange selection:text-white">
      {/* Gen-Z Stylized Hero Section */}
      <section className="relative w-full py-32 md:py-48 overflow-hidden group">
        {/* Background Image that we generated */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.png" 
            alt="Space Aesthetic Background" 
            fill 
            className="object-cover opacity-60 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black z-10" />
        </div>
        
        <div className="container relative z-20 flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto px-6 mt-12">
          {/* Glowing Badge */}
          <div className="inline-flex items-center rounded-full px-6 py-2 text-sm font-semibold tracking-wide border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,133,27,0.4)] text-brand-orange">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            New Premium Gifts Available
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] uppercase">
            Your Trusted <span className="text-brand-orange drop-shadow-[0_0_20px_rgba(255,133,27,0.8)]">Fix</span><br />
            Every Time.
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light tracking-wide leading-relaxed">
            Crafting memorable, tailor-made gifts in Australia. High-end personalization that cuts through the noise.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-8 w-full sm:w-auto">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-brand-orange hover:bg-[#ff9c45] text-white font-black px-12 h-16 rounded-[2rem] text-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,133,27,0.6)] border-2 border-brand-orange">
                Shop The Drop &rarr;
              </Button>
            </Link>
            <Link href="/shop?category=corporate" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full bg-white/5 hover:bg-white/10 text-white font-bold px-12 h-16 rounded-[2rem] text-xl backdrop-blur-md border-2 border-white/20 transition-all hover:scale-105">
                Corporate Ed.
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products - Glassmorphism Gen Z Vibes */}
      <section className="py-32 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px] -z-10 mix-blend-screen mix-blend-lighten pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] -z-10 mix-blend-screen mix-blend-lighten pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2 drop-shadow-lg">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Gifts</span>
              </h2>
              <p className="text-xl text-white/60">Handpicked personalized items that break the mold.</p>
            </div>
            <Link href="/shop" className="text-brand-orange font-bold text-xl hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
              View All <span>&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white/[0.03] hover:bg-white/10 border border-white/10 rounded-[2.5rem] p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,133,27,0.15)] backdrop-blur-xl">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-black/50 mb-6">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  />
                  {/* Overlay gradient */}
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
        </div>
      </section>

      {/* About 2Fix - Minimalist Marquee Style/Big Text Section */}
      <section className="py-32 relative overflow-hidden bg-white text-brand-black rounded-t-[4rem]">
        <div className="container mx-auto px-6 max-w-5xl text-center space-y-12">
          <div className="mx-auto w-24 h-2 bg-brand-orange rounded-full mb-12"></div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Why 2Fix? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff5000]">We Never Miss.</span>
          </h2>
          <p className="text-2xl md:text-4xl font-medium leading-normal text-muted-foreground/80 max-w-4xl mx-auto">
            Based in Australia. Elevating the art of gifting with high-voltage customization, deep laser engraving, and extreme attention to detail. 
          </p>
        </div>
      </section>
    </div>
  );
}
