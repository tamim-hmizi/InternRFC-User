import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InternRFC",
  description: "Intern management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex justify-center items-center flex-col`}
      >
        <Navbar />
        <div className="flex-grow flex flex-col justify-center items-center">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
