import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FEATURED_PRODUCTS = [
  {
    id: "prod_mug_21",
    name: "Personalised 21st Birthday Glass Mug",
    price: 35.0,
    image: "/placeholder-mug.png",
    category: "Drinkware",
  },
  {
    id: "prod_wallet_set",
    name: "Premium Leather Wallet & Pen Gift Set",
    price: 85.0,
    image: "/placeholder-wallet.png",
    category: "Accessories",
  },
  {
    id: "prod_flask",
    name: "Engraved Stainless Steel Flask",
    price: 45.0,
    image: "/placeholder-flask.png",
    category: "Drinkware",
  },
  {
    id: "prod_bottle",
    name: "Custom Insulated Water Bottle",
    price: 40.0,
    image: "/placeholder-bottle.png",
    category: "Drinkware",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-brand-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent z-10" />
        
        <div className="container relative z-20 flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg">
            Personalised Giftware&apos;s
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-2xl font-light">
            Crafting memorable, tailor-made gifts in Australia. 
            <br className="hidden md:inline" /> Your trusted fix, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/shop">
              <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 w-full sm:w-auto h-14 text-lg">
                Shop All Gifts
              </Button>
            </Link>
            <Link href="/shop?category=corporate">
              <Button size="lg" variant="outline" className="text-brand-black bg-white hover:bg-gray-100 font-semibold px-8 border-transparent w-full sm:w-auto h-14 text-lg">
                Corporate Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Gifts</h2>
              <p className="text-muted-foreground mt-2">Handpicked personalised items for your loved ones.</p>
            </div>
            <Link href="/shop" className="hidden sm:block text-brand-orange font-medium hover:underline">
              View All &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col group">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm mb-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  {/* Since we don't have actual images yet, we'll use a styled div placeholder */}
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                    <Image 
                      src={`/product-placeholder.png`} 
                      alt={product.name} 
                      fill 
                      className="object-cover opacity-10"
                    />
                    <span className="z-10 text-sm font-medium">{product.category} Image</span>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-brand-orange transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm font-medium">
                  ${product.price.toFixed(2)} AUD
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* About 2Fix Section */}
      <section className="py-24 bg-white dark:bg-muted border-t">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <div className="mx-auto w-24 h-1 bg-brand-orange rounded-full mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why 2Fix?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Established in Australia, 2Fix brings you the finest selection of personalized gifts. 
            Whether it&apos;s a milestone birthday, a corporate event, or a simple gesture of love, 
            we ensure high-quality engraving, printing, and craftsmanship. <strong>Your trusted fix, every time.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
