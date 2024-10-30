import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";
import { beaufortForLol, spiegel } from "@/lib/localFonts";

export const metadata: Metadata = {
  title: "LoLMH.Next",
  description: "A LoLMH.React project migration.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spiegel.className} ${beaufortForLol.className}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
