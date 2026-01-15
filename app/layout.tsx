import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Sriracha } from 'next/font/google';

const josefinSans = Josefin_Sans({ subsets: ["latin"] });
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
        <body className={josefinSans.className}>{children}</body>
    </html>
  );
}
