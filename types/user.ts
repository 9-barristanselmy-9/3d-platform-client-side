
export interface IUser {
   name: string;
  email: string;
  password: string;
  image?: string;
  emailVerified?: Date | null;
}
