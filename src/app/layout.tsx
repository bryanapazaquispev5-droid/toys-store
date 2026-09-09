import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductModal } from '@/components/ProductModal';
import { WhatsAppFloating } from '@/components/WhatsAppFloating';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono(
  {
    variable: '--font-geist-mono',
    subsets: ['latin'],
  }
);

export const metadata: Metadata = {
  title: 'Juguetería Mágica - Catálogo y Pedidos por WhatsApp',
  description: 'Encuentra los mejores juguetes para todas las edades y päelos directo por WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50/50 min-h-screen flex flex-col`}
      >
        <CartProvider>
          {children}
          <CartDrawer />
          <ProductModal />
          <WhatsAppFloating />
        </CartProvider>
      </body>
    </html>
  );
}