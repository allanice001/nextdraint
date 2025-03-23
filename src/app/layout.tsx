import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ReactNode } from "react";
import { AuthProvider } from "@/components/auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {Toaster} from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Draint™ 🎨 Buy and Sell original artwork and paintings. Search and find artists worldwide - Draint™",
  description:
    "Buy, sell, and trade digital art from the world's best artists.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header session={session} />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      <Toaster closeButton richColors position='top-center' toastOptions={{duration: 3000}} />
      <Analytics/>
      </body>
    </html>
  );
}
