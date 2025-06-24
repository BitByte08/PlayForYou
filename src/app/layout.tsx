import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import BackgroundImg from "@/components/layout/BackgroundImg";
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex overflow-hidden h-screen max-h-screen w-screen max-w-screen p-8`}>
        <section className="w-full h-full glass-default rounded-[3rem] p-4 flex z-1">
	        <Sidebar />
	        {children}
        </section>
        <BackgroundImg />
      </body>
    </html>
  );
}
