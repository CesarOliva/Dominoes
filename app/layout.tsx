import { Toaster } from 'sonner';
import type { Metadata } from "next";

import { Work_Sans } from 'next/font/google';
import "./globals.css";
import { ConvexClientProvider } from '@/providers/convex-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { EdgeStoreProvider } from '@/utils/edgestore';
import SearchCommand from '@/components/Search';
import { CartProvider } from '@/providers/cart-provider';
import { AuthSync } from '@/context/AuthSync';

const workSans = Work_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Dominoes | Mesas de Juegos",
  description: "La mesa que hará legendarias tus noches con amigos.",
  icons: {
    icon: [
      {
        url: "/logo-cropped.jpg",
        href:"/logo-cropped.jpg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={workSans.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <CartProvider>
              <AuthSync/>
              <Toaster position='bottom-center'/>
              <ScrollToTop/>
              <Navbar/>
              <SearchCommand/>
              {children}
              <Footer/>
            </CartProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
