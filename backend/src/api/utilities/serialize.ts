import { sign, SignOptions, verify } from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { User } from "./types";

export const serializeCookie = (payload: User) => {
  const token = sign(
    payload as object, 
    process.env.JWT_SECRET as string, 
    { expiresIn: process.env.JWT_EXPIRES_IN } as SignOptions
  );
  return serialize("MyJWTSite", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    path: "/",
    domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : "localhost"
  });
};

export const deserializeCookie = (cookieHeader: string | undefined): User | null => {
  try {
    if (!cookieHeader) return null;
    
    const cookies = parse(cookieHeader);
    const token = cookies["MyJWTSite"];
    
    if (!token) return null;

    const userData = verify(token, process.env.JWT_SECRET as string) as User;
    return userData;
  } catch (error) {
    return null;
  }
};


