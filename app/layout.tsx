import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fredi Anriko — Software Engineer & Project Manager",
    template: "%s — Fredi Anriko",
  },
  description:
    "Portfolio of Fredi Anriko — software engineer and technical project manager specializing in backend development, DevOps, and cloud-native systems.",
  keywords: [
    "Fredi Anriko",
    "Software Engineer",
    "Project Manager",
    "Backend Developer",
    "DevOps",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Fredi Anriko" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Fredi Anriko — Software Engineer & Project Manager",
    description:
      "Software engineer and technical project manager specializing in backend development, DevOps, and cloud-native systems.",
    siteName: "Fredi Anriko",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fredi Anriko — Software Engineer & Project Manager",
    description:
      "Software engineer and technical project manager specializing in backend development, DevOps, and cloud-native systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
