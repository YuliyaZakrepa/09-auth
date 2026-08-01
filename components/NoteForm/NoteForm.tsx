"use client";
import css from "./NoteForm.module.css";
import type { NoteTag } from "@/types/note";
import { createNote } from "@/lib/api/clientApi";
import { useId, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const id = useId();
  const { draft, setDraft, clearDraft } = useDraftStore();
  const router = useRouter();
  const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      clearDraft();
      router.push(`/notes/${note.id}`);
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (formData: FormData) => {
    if (isSubmitting || isPending) return;
    setIsSubmitting(true);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NoteTag;
    if (!title.trim() || !content.trim()) {
      toast.error("Please complete all required fields.");
      setIsSubmitting(false);
      return;
    }
    mutate(
      { title, content, tag },
      {
        onError: () => {
        toast.error("Failed to create note. Please try again.");
        setIsSubmitting(false);
        },
      },
    );
  };

  const isFormDisabled = isSubmitting || isPending;

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={draft?.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={draft?.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          value={draft?.tag}
          onChange={handleChange}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          disabled={isFormDisabled}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isFormDisabled}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
