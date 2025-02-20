import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import icon from '@/public/favicon.ico'

import ReduxProvider from '@/components/reduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clock In Clock Out',
  description: 'Generated by Darshan Bhikadiya',
  // icons: {
  //   icon: "@/public/favicon.ico",
  // },
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    // { rel: "icon", url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    // { rel: "icon", url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    // { rel: "apple-touch-icon", url: "/apple-touch-icon.png" }, // For Apple devices
  ],
  manifest : "/site.webmanifest"
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/image.svg" sizes='96x96'/> */}
      <body className={inter.className}>
        <ReduxProvider>   
          {/* Apde javaScript ma sidhu ahiya j provider use karta pn evi rite ahiya nai thai component banavi ne karvu padse */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
