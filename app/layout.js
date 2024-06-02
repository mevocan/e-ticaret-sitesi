"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Nav/Navbar";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import BotNav from "./components/Nav/BotNav";
import { Suspense } from "react";
import { CategoryProvider } from "@/context/category";
import { TagProvider } from "@/context/tag";
import { ProductProvider } from "@/context/product";
import Footer from "./components/Nav/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <TagProvider>
          <CategoryProvider>
            <ProductProvider>
            <body className={inter.className}>
              <Suspense>
                <ProgressBar
                  height="4px"
                  color="#0f172A"
                  options={{ showSpinner: false }}
                  shallowRouting
                />
                <Toaster />
                <Navbar />
                {children}
                <Footer />
                <BotNav />
              </Suspense>
            </body>
            </ProductProvider>
          </CategoryProvider>
        </TagProvider>
      </SessionProvider>
    </html>
  );
}
