import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract get(userId: string): Promise<User>;
  abstract getAll(): Promise<User[]>;
}
