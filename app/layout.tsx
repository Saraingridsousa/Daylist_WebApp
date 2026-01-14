import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sriracha } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

const sriracha = Sriracha({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sriracha',
});

export const metadata: Metadata = {
  title: "Daylist WebApp",
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={sriracha.variable}>
        <body className={inter.className}>{children}</body>
    </html>
  );
}
