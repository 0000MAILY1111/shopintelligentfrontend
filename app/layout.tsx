import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/ui/MainNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tienda Inteligente",
  description: "Generated smart Intelligent app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainNav />
        <main className="lg:flex lg:h-screen lg:overflow-y-hidden">
          <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10">
            {children}
          </div>
          <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5">
          </aside>
        </main>
      </body>
    </html>
  );
}