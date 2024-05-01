import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { CheckPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types"

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const { data } = await api<string>('/auth/create-account', {method: "POST", data: formData})
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const { data } = await api<string>('/auth/confirm-account', {method: "POST", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
  try {
    const { data } = await api<string>('/auth/request-code', {method: "POST", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  try {
    const { data } = await api<string>('/auth/login', {method: "POST", data: formData})
    localStorage.setItem('AUTH_TOKEN', data)
    
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error ?? 'Hubo un error, por favor comprueba tus credenciales o vuelve a intentarlo más tarde')
    }
  }
}

export async function requestPasswordCode(formData: ForgotPasswordForm) {
  try {
    const { data } = await api<string>('/auth/forgot-password', {method: "POST", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error ?? 'Hubo un error, por favor comprueba tus datos o vuelve a intentarlo más tarde')
    }
  }
}

export async function validateToken(formData: ConfirmToken) {
  try {
    const { data } = await api<string>('/auth/validate-token', {method: "POST", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error ?? 'Hubo un error, por favor comprueba el token o vuelve a intentarlo más tarde')
    }
  }
}

export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
  try {
    const { data } = await api<string>(`/auth/update-password/${token}`, {method: "POST", data: formData})
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error ?? 'Hubo un error, por favor comprueba el token o vuelve a intentarlo más tarde')
    }
  }
}

export async function getUser () {
	try {
    const { data } = await api('/auth/user', {method: "GET"})
    const response = userSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(
				error.response.data.error ??
					"Hubo un error, por favor comprueba el token o vuelve a intentarlo más tarde"
			);
		}
	}

}


export async function checkPassword(formData : CheckPasswordForm) {
  try {
    const { data } = await api<string>('/auth/check-password', {method: "POST", data: formData})
    return data
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(
				error.response.data.error ??
					"Hubo un error, por favor comprueba el token o vuelve a intentarlo más tarde"
			);
		}
	}
}