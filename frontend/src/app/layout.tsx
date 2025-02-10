import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers"; // added
import dynamic from "next/dynamic";
import TopBar from "@/components/ui/TopBar";
import ContextProvider from '../../config/ContextProvider';

export const metadata: Metadata = {
  title: "Private Storage | KiiChain",
  description: "Done by Yul",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get("cookie") || "";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <WagmiProvider config={config}> */}
          <TopBar />
          <ContextProvider cookies={cookies} account={null} connectWallet={async function connectWallet() { "use server"; }}>
          {/* <SidebarProvider className="mt-10"> */}
            {/* <AppSidebar /> */}
            <main className="flex-1 mt-16 w-full bg-[#f1f1f2]">
              {/* <SidebarTrigger /> */}
              {children}
            </main>
          {/* </SidebarProvider> */}
          <Button className="fixed bottom-[5px] right-4 bg-primary px-10 py-6 mr-4 text-white shadow-lg hover:bg-secondary text-lg transition-all duration-300 transform hover:scale-110 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10,2c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S5.6,2,10,2 M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0 L10,0z" />
              <path d="M11,12.3V13c0,0-1.8,0-2,0v-0.6c0-0.6,0.1-1.4,0.8-2.1c0.7-0.7,1.6-1.2,1.6-2.1c0-0.9-0.7-1.4-1.4-1.4 c-1.3,0-1.4,1.4-1.5,1.7H6.6C6.6,7.1,7.2,5,10,5c2.4,0,3.4,1.6,3.4,3C13.4,10.4,11,10.8,11,12.3z" />
            </svg>
            Soporte
          </Button>
          </ContextProvider>
        {/* </WagmiProvider> */}
      </body>
    </html>
  );
}
