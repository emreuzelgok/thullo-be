import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({ 
    firstName: string().min(3).max(50).required(),
    lastName: string().min(3).max(50).required(),
    email: string().email().required(),
    password: string().min(8).max(50).required(),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
  })
})

