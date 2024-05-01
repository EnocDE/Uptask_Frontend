import { isAxiosError } from "axios"
import { Note, NoteFormData, Project, Task } from "../types"
import api from "@/lib/axios";

type NoteAPIType = {
  formData: NoteFormData,
  projectId: Project['_id'],
  taskId: Task['_id'],
  noteId: Note['_id']
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPIType, 'formData' | 'projectId' | 'taskId'>) {
  try {
    const {data} = await api<string>(`/projects/${projectId}/tasks/${taskId}/notes`, {method: "POST", data: formData})
    return data
  } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
  }
}

export async function removeNote({projectId, taskId, noteId} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
  try {
    const {data} = await api<string>(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`, {method: "DELETE"})
    return data
  } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
  }
}