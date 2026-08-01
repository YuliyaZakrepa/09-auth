
import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api/serverApi";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";


interface NotePreviewProps{
    params: Promise<{id: string}>
}
export default async function NotePreview({params}:NotePreviewProps){
const {id} = await params;
const queryClient = new QueryClient();
await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: ()=>fetchNoteById(id),
    retry:false
})
return (
    <HydrationBoundary state={dehydrate(queryClient)}>

    <NotePreviewClient/>

    </HydrationBoundary>
)

}