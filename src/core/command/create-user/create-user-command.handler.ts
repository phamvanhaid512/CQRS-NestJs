import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user-command';
import { HttpException, Inject } from '@nestjs/common';
import { USER_REPO, UserRepo } from 'src/core/repo/user.repo';
import { User } from 'src/core/domains/user/user';
import { UserPassword } from 'src/core/domains/user/user-password';
import { type } from 'os';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPO)
    private userRepo: UserRepo,
  ) {}

  async execute({ props }: CreateUserCommand) {
 

    // const foundUsername = await this.userRepo.findByUserName(props.name);
    // if (foundUsername) {
    //   throw new HttpException('User adlready', 403);
    // }
    

    const password = await UserPassword.createFromRaw(props.password);
    console.log("password",password);
    const { name, gender, username } = props;
    const user = User.create({
      name,
      gender,
      password,
      username,
    });
    console.log('user',user);

    return await this.userRepo.create(user);
    // TODO: return something
  }
}
