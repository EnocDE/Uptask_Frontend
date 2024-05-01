import { createNote } from "@/api/NoteAPI"
import { NoteFormData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ErrorMessage from "../ErrorMessage"

export default function AddNoteForm() {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  
  const initialValues: NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: createNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      reset()
      queryClient.invalidateQueries({queryKey: ["task", taskId]})
      toast.success(data)
    }
  })

  const handleAddNote = (formData: NoteFormData) => mutate({projectId, taskId, formData})

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddNote)} className="space-y-3" noValidate>

        <div className="flex flex-col gap-2 ">
          <label className="font-bold" htmlFor="content" >Crear nota</label>
          <input className="w-full p-3 border border-gray-300" type="text" id="content" placeholder="Contenido de la nota" {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })} />
          {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        </div>

        <input className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer transition-colors" type="submit" value={'Crear nota'} />
      </form>
    </div>
  )
}
