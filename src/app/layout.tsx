// D:\testing\organo\src\app\layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer"; 

export const metadata: Metadata = {
  title: "Organo By Sana",
  description: "Premium natural & organic products",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-brand-cream text-brand-brown antialiased`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <CartDrawer />
            <main className="flex-grow pt-14 md:pt-19">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}