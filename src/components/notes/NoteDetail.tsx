import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import Spinner from "../Spinner"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"
import { removeNote } from "@/api/NoteAPI"

type NoteDetailProps = {
  note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const taskId = searchParams.get('viewTask')!

  const {data, isLoading} = useAuth()
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: removeNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["task", taskId]})
    }
  })

  const handleRemoveNote = () => mutate({projectId, taskId, noteId: note._id})
  
  if (isLoading) return <Spinner />
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-400">
          {formatDate(note.createdAt)}
        </p>
      </div>
      {canDelete && <button onClick={handleRemoveNote} type="button" className="py-2 px-3 bg-red-500 hover:bg-red-600 transition-colors font-bold text-white">Eliminar</button>}
    </div>
  )
}
