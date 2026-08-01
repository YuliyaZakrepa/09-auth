import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import { NoteTag } from "@/types/note";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(
  params: Promise<{ slug: string[] }>,
): Promise<Metadata> {
  const { slug } = await params;
  const currentSlug = slug && slug.length > 0 ? slug[0] : "all";
  const categoryName = currentSlug !== "all" ? `${currentSlug}` : "All tags";

  return {
    title: `Notes - ${categoryName}`,
    description:
      "Browse notes tagged with all tags. NoteHub allows you to filter and view notes based on specific tags for better organization.",
    openGraph: {
      title: `Notes - ${categoryName}`,
      description:
        "Browse notes tagged with all tags. NoteHub allows you to filter and view notes based on specific tags for better organization.",
      url: `${BASE_URL}/notes/filter/${slug}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: `Notes - ${categoryName} | NoteHub`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes - ${categoryName}`,
      description:
        "Browse notes tagged with all tags. NoteHub allows you to filter and view notes based on specific tags for better organization.",
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}
interface NotesProps {
  searchParams: Promise<{ search?: string; page?: string }>;
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ searchParams, params }: NotesProps) {
  const query = await searchParams;
  const search = query.search || "";
  const page = Number(query.page) || 1;
  const perPage = 12;
  const { slug } = await params;
  const currentSlug = slug && slug.length > 0 ? slug[0] : "all";

  const tag = currentSlug === "all" ? undefined : (currentSlug as NoteTag);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", search, page, perPage, tag],
    queryFn: () => fetchNotes(search, page, perPage, tag),
    retry: false,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
