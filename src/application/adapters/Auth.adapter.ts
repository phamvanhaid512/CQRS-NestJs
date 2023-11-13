import { Body, Res, Get, Controller, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/core/command/create-user/create-user-command';
import { UserDto, UserSigninDto } from '../dto/d';
import { SigninUserQuery } from 'src/core/queries/signin-user/signin-user.query';

@Controller('auth')
export class AuthAdapter {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}
  @Get()
  async testAuth() {
    return 'pham van hai';
  }
  @Post()
  async newUser(@Body() user: UserDto, @Res() res: any) {
    console.log('haipham');
   const userDoc = await this.commandBus.execute(new CreateUserCommand(user));
  res.json(userDoc);
  }
  @Post('login')
  async Login(@Body() user:UserSigninDto) {
    console.log('login');
    return await this.queryBus.execute(new SigninUserQuery(user))
  }
}
