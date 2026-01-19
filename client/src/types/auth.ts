export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}
export interface IAuthResponse {
  user: IUser;
  token: string;
}
export interface IAuthError {
  message: string;
  errors?: Record<string, string[]>;
}
