import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./providers";
import Header from "@/components/Header";
import styles from "./layout.module.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "統計的星座占い｜今日の星座ランキング",
  description: "星座ごとの統計データをもとに、今日の運勢ランキングを楽しめる星座占いサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${styles.page}`}
      >
        <Providers>
          <Header />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
