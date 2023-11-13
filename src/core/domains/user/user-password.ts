import * as brcypt from 'bcrypt';
export type UserPasswordProps = string;

export class UserPassword {
  private pwd: string;

  protected constructor(hasedPassword: string) {
    this.pwd = hasedPassword;
  }

  static async createFromRaw(
    rawPassword: UserPasswordProps,
  ): Promise<UserPassword> {
    const hashedPwd = await UserPassword.hashPassword(rawPassword);

    return new UserPassword(hashedPwd);
  }

  static createFromHashedPwd(hashedPwd: string) {
    return new UserPassword(hashedPwd);
  }

  static async compare(rawPassword: string, hashedPwd: string) {
    return await brcypt.compare(rawPassword, hashedPwd);
  }

  static async hashPassword(rawPassword: string) {
    return await brcypt.hash(rawPassword, 10);
  }

  public getPassword(): string {
    return this.pwd;
  }
}
