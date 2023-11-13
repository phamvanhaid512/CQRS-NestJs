import { CreateUserHandler } from "./create-user/create-user-command.handler";
import { CreateUserCommand } from "./create-user/create-user-command";
import { FindUserHandler } from "./find-user/find-user-command.handler";
import { FindUserCommand } from "./find-user/find-user-command";
export const commandHandlers = [
    CreateUserHandler, CreateUserCommand ,FindUserHandler,FindUserCommand
]