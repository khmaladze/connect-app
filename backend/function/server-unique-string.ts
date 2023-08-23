import { randomBytes } from "crypto";

export const generateUniqueString = (): string => {
  const bytes = randomBytes(32);
  return bytes.toString("hex");
};
