import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const liShadhinata = localFont({
  src: [
    {
      path: "./fonts/LiShadhinata2-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LiShadhinata2-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LED লাইট ও স্ট্যান্ড | সেরা দামে অর্ডার করুন",
  description:
    "উন্নত মানের LED লাইট ও মোবাইল স্ট্যান্ড। কম্বো অফার মাত্র ৬৫০ টাকা। ঢাকায় ডেলিভারি ৭০ টাকা, বাইরে ১২০ টাকা।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={liShadhinata.variable}>
      <body className="antialiased">
        {children}
        <footer className="text-center py-4 text-zinc-600 text-xs">
          Ⓒ সবকিছু ২০২৬, সর্বস্বত্ব সংরক্ষিত —{" "}
          <a
            href="https://shobkichu.com.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            shobkichu.com.bd
          </a>
        </footer>
      </body>
    </html>
  );
}
