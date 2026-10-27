import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const whyte = localFont({
  src: [
    { path: "./fonts/Whyte-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Whyte-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Whyte-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Whyte-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-whyte",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/WhyteMono-Regular.woff2",
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

const slang = localFont({
  src: [
    { path: "./fonts/GrandSlang-Roman.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GrandSlang-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-slang",
  display: "swap",
});

export const metadata: Metadata = {
  title: "dope.security – The Fly-Direct Secure Web Gateway with AI DLP",
  description:
    "The next-gen Secure Web Gateway: on-device proxy with local SSL inspection, AI DLP monitoring, and SSE capabilities for secure direct internet access.",
};

export const viewport: Viewport = {
  themeColor: "#090909",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${whyte.variable} ${mono.variable} ${slang.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
