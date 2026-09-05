import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-sans",
});

export const metadata: Metadata = {
  title: "Helix Claims",
  description:
    "Claims filing software for assisted living, skilled nursing, and agencies — from packet to paid.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${geistSans.className} min-h-full flex flex-col`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
