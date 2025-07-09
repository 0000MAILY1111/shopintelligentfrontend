
import MainNav from "@/components/ui/MainNav";
import ShoppingCart from "@/components/cart/ShoppingCart";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MxZ Tienda Inteligente",
  description: "Tu tienda inteligente de tecnología",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
          <MainNav />
          <main className="lg:flex lg:min-h-screen">
            <div className="md:flex-1 md:overflow-y-auto pt-10 pb-32 px-10">
              {children}
            </div>
            <aside className="md:w-96 md:overflow-y-auto pt-10 pb-32 px-5 border-l border-gray-200">
              <ShoppingCart />
            </aside>
          </main>
        </div>
      </body>
    </html>
  );
}