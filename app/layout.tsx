import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Footer, Header, PageBanner } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Easy Breezy Travels",
  description:
    "Premium travel experiences powered by modern technology — Easy Breezy Travels.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        <Header />
        <PageBanner />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
