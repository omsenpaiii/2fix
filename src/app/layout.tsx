import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2Fix Personalised Giftware",
  description: "Your Trusted Fix, Every Time. Premium personalised giftware based in Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-smooth dark">
      <body className={`${font.className} min-h-screen flex flex-col bg-brand-black text-white`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
