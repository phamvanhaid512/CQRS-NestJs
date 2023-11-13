import { ICommandHandler,CommandHandler } from "@nestjs/cqrs";
import { FindUserCommand } from "./find-user-command";
import { Inject } from "@nestjs/common";
import { USER_REPO, UserRepo } from 'src/core/repo/user.repo';
import {error} from "console";


@CommandHandler(FindUserCommand)
export class FindUserHandler implements ICommandHandler<FindUserCommand> {
    constructor(
        @Inject(USER_REPO)
        private userRepo: UserRepo
    ) {}

    async execute(command: FindUserCommand): Promise<any> {
        const foundUsername = await this.userRepo.findByUserName(command.props.username);
        if(!foundUsername) throw error('No not exits user ')
        return {
            status: 'ok',
            data: foundUsername
        };
    }

}