import bcrypt from 'bcryptjs';

export const getPasswordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
