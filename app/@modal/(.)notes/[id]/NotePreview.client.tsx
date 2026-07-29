"use client";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    retry: false,
    refetchOnMount: false
  });
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {isError && !data && <p>Something went wrong.</p>}
        {isSuccess && (
          <div className={css.item}>
            <button className={css.backBtn} onClick={() => router.back()}>
              Back
            </button>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.tag}>{data?.tag}</p>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>
              {data.updatedAt
                ? `Updated at: ${data?.updatedAt}`
                : `Created at: ${data?.createdAt}`}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
