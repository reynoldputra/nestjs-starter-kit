import * as bcrypt from 'bcryptjs';

export const hashPassword = async (str: string, salt = 10): Promise<string> => {
  return await bcrypt.hash(str, salt);
};

export const comparePassword = async (
  str: string,
  str2: string,
): Promise<boolean> => {
  return await bcrypt.compare(str, str2);
};
