import { SigninUserHandler } from "./signin-user/signin-user-query.handler";
import { SigninUserQuery } from "./signin-user/signin-user.query";

export const queryHandler = [
    SigninUserQuery,
    SigninUserHandler
]