import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black/90 text-white/80 py-12 md:py-16 backdrop-blur-md">
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <div className="relative h-16 w-40 bg-white/5 backdrop-blur-md rounded-xl p-2 border border-white/10 hover:border-brand-orange transition-colors cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="2Fix Logo" 
              fill 
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className="text-sm leading-loose text-white/60">
            Personalised Giftware&apos;s &copy; {new Date().getFullYear()} <br />
            2Fix - Your Trusted Fix, Every Time. <br/>
            Based in Australia.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          <Link href="/shop" className="text-sm font-medium hover:text-brand-orange transition-colors">
            Shop All
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-brand-orange transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-brand-orange transition-colors">
            Contact Contact
          </Link>
          <Link href="/terms" className="text-sm font-medium hover:text-brand-orange transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
