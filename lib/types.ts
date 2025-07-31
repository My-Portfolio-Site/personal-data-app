type ActionResponse<T = any> = {
  success: boolean
  status?: number
  message?: string
  data?: T
}

// Used for Actions state response message
type FormValidationMessage = {
  success: boolean
  message: string
}

type ApiResponseMessage = {
  message: string
  status?: number
}
