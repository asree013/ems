import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import newLogo from '@/assets/image/icon_menu/logo4.png';

const inter = Inter({
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif'], // เพิ่ม fallback ฟอนต์
});

export let metadata: Metadata = {
  applicationName: 'Marine-EMS',
  generator: "Next.js",
  manifest: "/manifest.json",
  title: 'Marine-EMS',
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  description: 'Generated by create next app',
  icons: newLogo.src,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: 'Marine-EMS',
    // startUpImage: [],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&family=Noto+Sans+Thai:wght@100..900&display=swap" rel="stylesheet"></link>

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
