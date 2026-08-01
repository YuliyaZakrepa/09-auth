import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";
import Image from "next/image";

import css from "./ProfilePage.module.css";
import { ApiError } from "@/lib/api/api";
import { Metadata } from "next";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: "Profile Page | NoteHub",
  description: "Manage your personal profile",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Profile Page | NoteHub",
    description: "Manage your personal profile",
    url: `${baseURL}/profile`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Profile Page | NoteHub",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile Page | NoteHub",
    description: "Manage your personal profile",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default async function Profile() {
  try {
    const user = await getMe();
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar ||  "https://goit.global"}
              alt={user.email || 'User avatar'}
              width={120}
              height={120}
              className={css.avatar}
              
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    const errorMsg =
      (error as ApiError).message ??
      (error as ApiError).response?.data?.error ??
      "Failed to load profile data. Please refresh the page.";

    return (
      <main className={css.mainContent}>
        <div className={css.errorCard}>
          <h2>Error</h2>
          <p>{errorMsg}</p>
        </div>
      </main>
    );
  }
}
