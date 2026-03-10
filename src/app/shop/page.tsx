import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
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
  {
    id: "prod_wine_box",
    name: "Personalised Wooden Wine Box",
    price: 60.0,
    image: "/placeholder-wine.png",
    category: "Accessories",
  },
  {
    id: "prod_keychain",
    name: "Engraved Leather Keychain",
    price: 15.0,
    image: "/placeholder-keychain.png",
    category: "Accessories",
  },
];

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
    <div className="container mx-auto px-6 py-12 max-w-7xl min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Gifts` : "Shop All Gifts"}
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our full range of personalised items.
          </p>
        </div>
      </div>
      
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-sm mb-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover opacity-10"
                  />
                  <span className="z-10 text-sm font-medium">{product.category}</span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-brand-orange transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-brand-orange mt-1 text-sm font-bold">
                ${product.price.toFixed(2)} AUD
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">No products found for this category.</p>
          <Link href="/shop" className="text-brand-orange font-medium hover:underline mt-4 inline-block">
            Clear Filters
          </Link>
        </div>
      )}
    </div>
  );
}
