import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import ProductQuickView from '@/components/features/ProductQuickView';
import LiveChat from '@/components/features/LiveChat';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Chishti Furniture Mart | Premium Furniture for Modern Living',
  description: 'Discover handcrafted, premium furniture for every room. Shop sofas, dining tables, beds & more at Chishti Furniture Mart.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body bg-soft-white text-charcoal">
        <ThemeProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <ProductQuickView />
          <LiveChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
