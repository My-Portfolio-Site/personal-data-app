type ActionResponse<T = any> = {
  success: boolean
  status?: number
  message?: string
  data?: T
}

type ApiResponseMessage = {
  message: string
  status?: number
}

// type ActionResponse<T> = {
//   message: string
//   data?: T;
//   error?: Record<string, any>
//   status?: boolean
// }

type ActionResponseWithData<T> = {
  message: string;
  data: T;
  error?: Record<string, any>;
  status?: boolean;
};

type ActionResponseWithoutData = {
  message: string;
  error?: Record<string, any>;
  status?: boolean;
};

// type ActionResponse<T = never> = T extends never
//   ? ActionResponseWithoutData
//   : ActionResponseWithData<T>;