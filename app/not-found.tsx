import css from "@/app/page.module.css";
import { Metadata } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "The page you are looking for does not exist or has been moved",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description:
      "The page you are looking for does not exist or has been moved",
    url: BASE_URL,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "404 - Page not found | NoteHub",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "404 - Page not found | NoteHub",
    description:
      "The page you are looking for does not exist or has been moved",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};
export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
