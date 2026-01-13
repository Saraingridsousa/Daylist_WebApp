import type { Metadata } from "next";
import { Sriracha } from "next/font/google";
import "./globals.css";

const sriracha = Sriracha({ 
  weight: '400',
  subsets: ["latin"] 
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
    <html lang="pt-BR">
      <body className={sriracha.className}>{children}</body>
    </html>
  );
}
