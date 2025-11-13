import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Runtime from "@/lib/runtime";
import { SocketBanner } from "@/components/shared/banners/socket_banner";
import { ErrorBannerHandler } from "@/components/shared/banners/error_banner_handler";
import { ErrorBanner } from "@/components/shared/banners/error_banner";
import { GlobalSocketErrorHandler } from "@/components/shared/global_socket_errors";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-smono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next App",
  description: "A modern, crisp Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SocketBanner />
        <ErrorBannerHandler />
        <ErrorBanner />
        <GlobalSocketErrorHandler />
        <Runtime>{children}</Runtime>
      </body>
    </html>
  );
}
