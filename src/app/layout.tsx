import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import logoIcon from '@/assets/icon/electronic-device_5758533.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // applicationName: 'EMSink App',
  // manifest: "/manifest.json",
  title: 'EMSink App',
  description: 'Generated by create next app',
  icons: logoIcon.src,
  // appleWebApp: {
  //   capable: true,
  //   statusBarStyle: "default",
  //   title: 'EMSink App',
  //   // startUpImage: [],
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
