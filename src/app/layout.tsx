import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Sidebar} from "@/components/global/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Play For You",
  description: "다같이 만들어가는 플레이리스트",
  verification: {
    google : "Kfe9KFkihJVcT4bVxBUvzdPOQClS9GIrKTybJsId4Iw"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex overflow-hidden p-4 box-border h-screen w-screen gap-4 bg-white`}>
        <main className="w-full h-full border-default rounded-4xl border-1 transition-w duration-500 background-default">
          {children}
        </main>
        <Sidebar />
      </body>
    </html>
  );
}
