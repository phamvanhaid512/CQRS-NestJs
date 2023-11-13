import { HttpException, Inject } from '@nestjs/common';
import { FindUserCommand } from 'src/core/command/find-user/find-user-command';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { USER_REPO, UserRepo } from 'src/core/repo/user.repo';
import { SigninUserQuery } from './signin-user.query';
import { UserPassword } from 'src/core/domains/user/user-password';
import { error } from 'console';

@QueryHandler(SigninUserQuery)
export class SigninUserHandler implements IQueryHandler<SigninUserQuery> {
	constructor(
		@Inject(USER_REPO)
		private userRepo: UserRepo,
	) { }

	async execute(command: SigninUserQuery) {
		const { username, password } = command.props;
		const foundUser = await this.userRepo.findByUserName(username);
		if (!foundUser) throw new Error('Can not fing user  exits');

		const comparePwd = await UserPassword.compare(password, foundUser.password)
		if (!comparePwd) throw new Error('Incorrect password ');

		return await foundUser
	}
}
