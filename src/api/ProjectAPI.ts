import api from "@/lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema, editProjectSchema, projectSchema } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData){
  try {
    const { data } = await api('/projects', {method: 'POST', data: formData})
    return data
  } catch (error) {
    // Evalular si es un error de axios y si existe response
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjects() {
  try {
    const {data} = await api('/projects')
    const response = dashboardProjectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  } 
}

export async function getProjectById(id: Project['_id']) {
  try {
    const {data} = await api(`/projects/${id}`)
    const response = editProjectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  } 
}

export async function getFullProject(id: Project['_id']) {
  try {
    const {data} = await api(`/projects/${id}`)
    const response = projectSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  } 
}

type ProjectAPIType = {
  formData: ProjectFormData,
  projectId: Project['_id']
}

export async function updateProject({formData, projectId} : ProjectAPIType) {
  try {
    const {data} = await api<string>(`/projects/${projectId}`, {method: "PUT", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  } 
}

export async function deleteProject(projectId: Project['_id']) {
  try {
    const {data} = await api<string>(`/projects/${projectId}`, {method: "DELETE"})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  } 
}