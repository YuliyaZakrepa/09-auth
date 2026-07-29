import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: "Create New Note | NoteHub",
  description:
    "Quickly create a new note in NoteHub – the efficient app for organizing your thoughts and ideas.",
  openGraph: {
    title: "Create New Note | NoteHub",
    description:
      "Quickly create a new note in NoteHub – the efficient app for organizing your thoughts and ideas.",
    url: `${BASE_URL}/notes/action/create`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Create New Note | NoteHub",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create New Note | NoteHub",
    description:
      "Quickly create a new note in NoteHub – the efficient app for organizing your thoughts and ideas.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {<NoteForm />}
      </div>
    </main>
  );
}
