import { User } from "../../generated/client";

export interface reqUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export enum UserError {
  Create = "TRD-USR-0001",
  Get = "TRD-USR-0002",
  GetList = "TRD-USR-0003",
  Update = "TRD-USR-0004",
  Delete = "TRD-USR-0005",
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
