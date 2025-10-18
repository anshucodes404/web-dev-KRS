import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export type JWTPayload = {
  _id: string;
  name: string;
  email: string;
};

export async function verifyJWT(req: NextRequest): Promise<JWTPayload> {
  const token =
    (await cookies()).get("token")?.value ||
    req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("Token is missing");
  }

  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as JWTPayload;

  if (!decoded || typeof decoded !== "object") {
    throw new Error("Decode token failed");
  }

  

  return decoded;
}


