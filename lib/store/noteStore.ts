import {create} from "zustand";
import { persist } from "zustand/middleware";
import type { NewNoteData, NoteTag} from "@/types/note";

interface NoteDraftStore{
    draft: NewNoteData;
    setDraft: (note: NewNoteData)=>void;
    clearDraft: ()=>void
}
const INITIAL_DRAFT={
    title: '',
    content: '',
    tag: 'Todo' as NoteTag
}
export const useDraftStore = create<NoteDraftStore>()(
    persist((set)=>({
        draft: INITIAL_DRAFT,
        setDraft: (note)=>set({draft: note}),
        clearDraft: () => set({draft: INITIAL_DRAFT})
    }), {name: "note-draft",partialize: (state) => ({ draft: state.draft }),})
)