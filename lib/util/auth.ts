import type { VercelRequest, VercelResponse } from '@vercel/node';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET!;
const PASSWORD: string | undefined = process.env.CLIENT_PASSWORD!;

interface UserJwtPayload {
  jti: string
  iat: number
}

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return JWT_SECRET_KEY;
}

export function verifyPassword(password: string): boolean {
  return password === PASSWORD;
}

/**
 * Adds the user token cookie to a response.
 */
export async function createToken() {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  return token;
}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: VercelRequest) {
  const token = req.headers.authorization;

  if (!token) return null;

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    )
    return verified.payload as UserJwtPayload;
  } catch (err) {
    return null;
  }
}