import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const ebGaramondHeading = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vocalith",
    template: "%s | Vocalith",
  },
  description: "AI-powered text-to-speech and voice cloning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html
          lang="en"
          className={cn(
            "h-full",
            "antialiased",
            geistSans.variable,
            geistMono.variable,
            "font-sans",
            notoSans.variable,
            ebGaramondHeading.variable,
          )}
        >
          <body>
            <TooltipProvider>
              <NuqsAdapter> {children}</NuqsAdapter>

              <Toaster />
            </TooltipProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
