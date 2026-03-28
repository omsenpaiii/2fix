import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

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
    <html lang="en" className="scrollbar-smooth">
      <body className={`${font.className} min-h-screen flex flex-col bg-white text-brand-black`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
