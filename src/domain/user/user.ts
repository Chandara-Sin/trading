import { User } from "../../generated/client";

export class UserModel {
  constructor(private instance: User) {}

  get toJson() {
    return {
      id: this.instance.id,
      firstName: this.instance.firstName,
      lastName: this.instance.lastName,
      email: this.instance.email,
      createdAt: this.instance.createdAt,
      updateAt: this.instance.updatedAt,
    };
  }
}
