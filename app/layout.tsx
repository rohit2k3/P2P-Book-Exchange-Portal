import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peer-to-Peer Book Exchange Portal",
  description: "Peer-to-Peer Book Exchange Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Book Exchange Portal</title>
        <meta name="description" content="Peer-to-Peer Book Exchange Portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
         <Navbar /> 
          {children}
          <footer className="bg-dark-900 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>
                © {new Date().getFullYear()} Book Exchange Portal. All rights
                reserved.
              </p>
            </div>
          </footer>
        </body>
      </AuthProvider>
    </html>
  );
}
