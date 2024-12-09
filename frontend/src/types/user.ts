export type SignupInput = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

export type AuthUserType = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};