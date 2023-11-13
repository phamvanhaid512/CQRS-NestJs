import { IQuery } from '@nestjs/cqrs';

export class SigninUserQuery implements IQuery {
  constructor(
    public readonly props: {
      username: string;
      password: string;
    },
  ) {}
}
