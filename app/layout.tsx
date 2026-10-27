import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "MyZiki — Ziki Issue Tracker Mockup",
  description: "Mockup of the Ziki Issue Tracker with whimsical graphics and playful UI experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased selection:bg-blue-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
