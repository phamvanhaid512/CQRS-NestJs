import {ICommand} from "@nestjs/cqrs"
import { UserGender } from "../../domains/user/enums";

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly props: {
            username: string,
            password: string,
            name: string,
            gender: number,
        },
        

    ) { }
}