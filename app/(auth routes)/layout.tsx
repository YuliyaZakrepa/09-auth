//import type { Metadata } from "next";







// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
// export const metadata: Metadata = {
//   title: "NoteHub",
//   description: "NoteHub is application for managing personal notes",
//   openGraph: {
//     title: "NoteHub",
//     description: "NoteHub is application for managing personal notes",
//     url: BASE_URL,
//     siteName: "NoteHub",
//     images: [
//       {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//         alt: "NoteHub",
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "NoteHub",
//     description: "NoteHub is application for managing personal notes",
//     images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
//   },
// };
'use client';

import { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import css from './AuthLayout.module.css'
interface AuthLayoutProps {
  children: React.ReactNode;
 
}
export default function AuthLayout({children}:AuthLayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}