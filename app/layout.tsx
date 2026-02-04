import { Toaster } from 'sonner';
import type { Metadata } from "next";

import { Work_Sans } from 'next/font/google';
import "./globals.css";
import { ConvexClientProvider } from '@/utils/convex-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { AuthProvider } from '@/context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
          <AuthProvider>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
              <Toaster position='bottom-center'/>
              <ScrollToTop/>
              <Navbar/>
              {children}
              <Footer/>
            </GoogleOAuthProvider>
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
