import { reqUser } from "../../../src/domain/user/user";
import { IUserService } from "../../../src/domain/user/user.service";
import { User } from "../../../src/generated/client";

export class MockUserService implements IUserService {
  createUser: (user: reqUser) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;

  constructor(user: User) {
    this.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ...user,
        id: "1",
      } as User)
    );
    this.getUser = jest.fn();
  }
}
