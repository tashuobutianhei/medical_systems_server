import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const encode = (password: string): string => {
  return bcrypt.hashSync(password, salt);
};

export const compare = (paramPwd: string, dbPwd: string): boolean => {
  return bcrypt.compareSync(paramPwd, dbPwd);
};
