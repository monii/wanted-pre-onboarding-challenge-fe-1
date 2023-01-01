export const emailRegExp = (email: string): boolean => {
  const regex = new RegExp("[a-z0-9]+@[a-z0-9]+.[a-z]{2,3}");
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length > 7 ? true : false;
};
