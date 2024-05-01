import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types"

export async function updateProfile(formData : UserProfileForm) {
  try {
    const {data} = await api<string>(`/auth/profile`, {method: "PUT", data: formData})
    return data
  } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
  }
}

export async function changePassword(formData : UpdateCurrentUserPasswordForm) {
  try {
    const {data} = await api<string>(`/auth/update-password`, {method: "POST", data: formData})
    return data
  } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
  }
}