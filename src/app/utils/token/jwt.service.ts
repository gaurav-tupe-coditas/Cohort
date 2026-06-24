import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const privateKey = readFileSync(
  join(process.cwd(), "keys/private.key"),
  "utf-8",
);

const publicKey = readFileSync(join(process.cwd(), "keys/public.key"), "utf-8");

export interface AccessTokenPayload {
  userId: string;
  email: string;
  name: string;
  role_id:string;
  password_version: number;
  jti: string;
}

export interface RefreshTokenPayload {
  userId: string;
  type: "refresh";
  password_version: number;
  jti: string;
}

const signAccessToken = (payload: Omit<AccessTokenPayload, "jti">): string => {
  const jti = randomUUID();
  return jwt.sign({ ...payload, jti }, privateKey, {
    algorithm: "RS256",
    expiresIn: "60m",
    issuer: "trello-platform",
    subject: payload.userId,
  });
};

const signRefreshToken = (userId: string, password_version: number): string => {
  const jti = randomUUID();
  return jwt.sign(
    {
      userId: userId,
      type: "refresh",
      password_version: password_version,
      jti,
    },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "7d",
      issuer: "trello-platform",
      subject: userId,
    },
  );
};

const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    issuer: "trello-platform",
  }) as AccessTokenPayload;
};

const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    issuer: "trello-platform",
  }) as RefreshTokenPayload;
};

const decode = (token: string) => {
  return jwt.decode(token);
};

const extractJti = (token: string): string | null => {
  const decoded = jwt.decode(token) as AccessTokenPayload | RefreshTokenPayload;
  return decoded?.jti || null;
};

export default {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decode,
  extractJti,
};
