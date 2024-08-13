import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const poppins = Poppins({ 
  subsets: ["latin"],
  weight:['400','500','600','700'],
  variable:'--font-poppins'
});

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management",
  icons:{
    icon:'/assets/images/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={`${poppins.variable} lg:pl-2 lg:pr-2`}>{children}</body>
      </html>
    </ClerkProvider>
    
  );
}
