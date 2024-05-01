import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
  formData: TaskFormData,
  projectId: Project['_id']
  taskId: Task['_id']
  status: Task['status']
}

export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>) {
  try {
    const { data } = await api<string>(`/projects/${projectId}/tasks`, {method: "POST", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getTaskById({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const { data } = await api(`/projects/${projectId}/tasks/${taskId}`)    
    const response = taskSchema.safeParse(data)
    
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateTask({projectId, taskId, formData} : Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const { data } = await api<string>(`/projects/${projectId}/tasks/${taskId}`, {method: "PUT", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteTask({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const { data } = await api<string>(`/projects/${projectId}/tasks/${taskId}`, {method: "DELETE"})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateStatus({projectId, taskId, status} : Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
  try {
    const { data } = await api<string>(`/projects/${projectId}/tasks/${taskId}/status`, {method: "POST", data : {status}})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}