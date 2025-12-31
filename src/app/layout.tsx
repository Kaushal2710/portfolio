import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaushal Ambaliya | Full-Stack Developer & AI Engineer",
  description: "Portfolio of Kaushal Ambaliya - Building intelligent systems with full-stack expertise in healthcare, AI infrastructure, and automation.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
