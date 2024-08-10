import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const bcrypt = {
  hashPassword(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },

  comparePasswords(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  },
};
