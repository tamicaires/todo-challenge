export class User {
  id?: string;
  name!: string;
  email!: string;
  password!: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserPayload {
  id: string;
  username: string;
  email: string;
}