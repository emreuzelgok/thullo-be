import { object, string } from "yup"

export const createSessionSchema = object({
  body: object({ 
    email: string().email().required(),
    password: string().min(8).max(50).required(),
  })
})