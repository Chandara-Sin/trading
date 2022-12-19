import { User } from "@prisma/client";

export interface reqUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class UserModel {
  constructor(private instance: User) {}

  get toJson() {
    return {
      id: this.instance.id,
      first_name: this.instance.firstName,
      last_name: this.instance.lastName,
      email: this.instance.email,
      created_at: this.instance.createdAt,
      updated_at: this.instance.updatedAt,
    };
  }
}
