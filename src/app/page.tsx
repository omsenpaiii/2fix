import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";
import { Facebook, Instagram, Twitter, MoveRight } from "lucide-react";

// Function to get the first 4 products for showcase
const featuredProducts = PRODUCTS.slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-brand-black selection:bg-brand-orange selection:text-white">
      {/* Hero Section: Huge Text and Overlapping Images */}
      <section className="relative w-full min-h-[90vh] overflow-hidden bg-white flex items-center justify-center pt-20">
        
        {/* Decorative absolute images serving as the "models/stickers" */}
        {featuredProducts[0] && (
          <div className="absolute top-20 left-[5%] md:left-[10%] w-48 h-64 md:w-64 md:h-80 rotate-[-8deg] z-10 transition-transform hover:scale-105 hover:rotate-0 duration-500">
            <Image 
              src={featuredProducts[0].image} 
              alt={featuredProducts[0].name} 
              fill 
              className="object-cover rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-[6px] border-white"
            />
          </div>
        )}
        
        {featuredProducts[1] && (
          <div className="absolute bottom-10 left-[20%] md:left-[30%] w-40 h-56 md:w-56 md:h-72 rotate-[12deg] z-30 transition-transform hover:scale-105 hover:rotate-0 duration-500">
            <Image 
              src={featuredProducts[1].image} 
              alt={featuredProducts[1].name} 
              fill 
              className="object-cover rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-[6px] border-white"
            />
          </div>
        )}

        {featuredProducts[2] && (
          <div className="absolute top-32 right-[20%] md:right-[25%] w-52 h-64 md:w-72 md:h-96 rotate-[5deg] z-10 transition-transform hover:scale-105 hover:rotate-0 duration-500">
            <Image 
              src={featuredProducts[2].image} 
              alt={featuredProducts[2].name} 
              fill 
              className="object-cover rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-[6px] border-white"
            />
          </div>
        )}

        {featuredProducts[3] && (
          <div className="absolute bottom-20 right-[5%] md:right-[10%] w-44 h-56 md:w-60 md:h-80 rotate-[-15deg] z-30 transition-transform hover:scale-105 hover:rotate-0 duration-500">
            <Image 
              src={featuredProducts[3].image} 
              alt={featuredProducts[3].name} 
              fill 
              className="object-cover rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-[6px] border-white"
            />
          </div>
        )}

        {/* Giant intersecting text */}
        <div className="relative z-20 w-full px-4 text-center pointer-events-none">
          <h1 
            className="text-[15rem] md:text-[25rem] lg:text-[35rem] font-black leading-none tracking-tighter text-brand-orange mix-blend-multiply opacity-90"
            style={{ fontFamily: "Impact, sans-serif" }}
          >
            2FIX
          </h1>
        </div>
      </section>

      {/* Featured Products - Clean Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col items-center text-center">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F5F5F5] mb-6">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                
                <h3 className="font-bold text-lg leading-tight mb-2 text-brand-black group-hover:text-brand-orange transition-colors">
                  {product.name}
                </h3>
                <p className="text-xl font-normal text-brand-black">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
             <Link href="/shop">
              <Button size="lg" className="bg-brand-black hover:bg-brand-orange text-white rounded-none px-12 py-8 text-lg uppercase tracking-widest font-bold transition-all">
                Shop All Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section - Minimalist Wix Style */}
      <footer className="bg-[#F6F5F3] pt-20 pb-12 border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            {/* Logo area */}
            <div className="md:col-span-3">
              <Link href="/">
                <div className="relative h-20 w-36 mb-6">
                  <Image 
                    src="/logo.png" 
                    alt="2Fix Logo" 
                    fill 
                    style={{ objectFit: 'contain', objectPosition: 'left' }}
                  />
                </div>
              </Link>
              <p className="text-xl font-bold text-[#5d4037]">Your Trusted Fix</p>
              <p className="text-xl font-bold text-[#5d4037]">Every Time.</p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-2xl font-normal text-[#3e2723] mb-6">Store Policy</h4>
              <ul className="space-y-3 text-sm font-medium text-[#5d4037]">
                <li><Link href="#" className="hover:underline underline-offset-4">Shipping Policy</Link></li>
                <li><Link href="#" className="hover:underline underline-offset-4">Refund Policy</Link></li>
                <li><Link href="#" className="hover:underline underline-offset-4">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:underline underline-offset-4">FAQ</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-2xl font-normal text-[#3e2723] mb-6">Legal</h4>
              <ul className="space-y-3 text-sm font-medium text-[#5d4037]">
                <li><Link href="#" className="hover:underline underline-offset-4">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:underline underline-offset-4">Accessibility Statement</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-2xl font-normal text-[#3e2723] mb-6">Contact</h4>
              <ul className="space-y-3 text-sm font-medium text-[#5d4037]">
                <li>123-456-7890</li>
                <li><a href="mailto:info@2fix.com" className="hover:underline underline-offset-4">info@2fix.com</a></li>
              </ul>
            </div>

            {/* Social Icons */}
            <div className="md:col-span-3 flex md:justify-end gap-3">
              <Link href="#" className="w-10 h-10 bg-[#3e2723] rounded-full flex items-center justify-center text-[#F6F5F3] hover:bg-brand-orange transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 bg-[#3e2723] rounded-full flex items-center justify-center text-[#F6F5F3] hover:bg-brand-orange transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 bg-[#3e2723] rounded-full flex items-center justify-center text-[#F6F5F3] hover:bg-brand-orange transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Mailing List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-end border-t border-gray-300 pt-16">
            <div className="lg:col-span-6">
              <h3 className="text-2xl font-normal text-[#3e2723] mb-4">Join Our Mailing List</h3>
              <p className="text-sm font-medium text-[#5d4037] mb-8">Stay updated with our latest news and updates delivered straight to your inbox.</p>
              
              <form className="space-y-4 max-w-lg">
                <label className="block text-xs font-bold text-[#5d4037]">Email address *</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-transparent border-b-2 border-gray-400 py-3 text-[#3e2723] placeholder:text-gray-500 focus:outline-none focus:border-[#3e2723] transition-colors"
                  />
                  <Button type="button" className="bg-[#3e2723] hover:bg-brand-orange text-[#F6F5F3] rounded-none px-10 py-6 text-sm font-medium transition-colors w-full sm:w-auto">
                    Join Now
                  </Button>
                </div>
                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" id="marketing" className="mt-1 flex-shrink-0" />
                  <label htmlFor="marketing" className="text-xs font-medium text-[#5d4037]">
                    Yes, I agree to receive marketing emails. *
                  </label>
                </div>
              </form>
            </div>

            <div className="lg:col-span-6 flex lg:justify-end text-xs font-medium text-[#5d4037]">
              <p>© 2026 by 2Fix. Powered and secured by 2Fix Technologies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
