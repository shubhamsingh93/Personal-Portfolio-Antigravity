import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Shubham Singh — Product & AI",
  description: "A dark matter aesthetic portfolio showcasing product management, technical architecture, and creative technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} antialiased`}>
      <body className="noise-bg bg-obsidian text-offwhite selection:bg-cyan selection:text-obsidian min-h-screen overscroll-none">
        {children}
      </body>
    </html>
  );
}
