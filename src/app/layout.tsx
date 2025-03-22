import "./globals.css";
import {Inter} from "next/font/google";
import type {Metadata} from "next";
import {ThemeProvider} from "next-themes";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {ReactNode} from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draint - Digital Art Marketplace",
  description:
    "Buy, sell, and trade digital art from the world's best artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
