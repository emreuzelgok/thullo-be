import jwt from "jsonwebtoken";

export function jwtSign(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, process.env.JWT_KEY, options);
}


export function jwtVerify(token: string) {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null
    }
  }
}