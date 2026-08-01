"use client";
import css from "./Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api/clientApi";
import { NoteTag } from "@/types/note";
import { useState } from "react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";


interface NotesClientProps{
  tag?: NoteTag|undefined;
}
export default function NotesClient({tag}:NotesClientProps) {
  const perPage = 12;
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
    
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", search, page, perPage,tag],
    queryFn: () => fetchNotes(search, page, perPage,tag),
    retry: false,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
 
  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setPage(1);
    
  }, 1000);

  return (
    <div className={css.notes}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.link} >
          Create note +
        </Link>
      </div>
      <div>
        {isSuccess && notes.length > 0 && <NoteList notes={notes} />}
        {isSuccess && notes.length === 0 && (
          <p>No notes found for your request.</p>
        )}
      </div>
    </div>
  );
}
