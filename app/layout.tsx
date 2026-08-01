import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is application for managing personal notes",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub is application for managing personal notes",
    url: BASE_URL,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "NoteHub",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description: "NoteHub is application for managing personal notes",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
