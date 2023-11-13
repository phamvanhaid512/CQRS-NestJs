import {Module } from "@nestjs/common";
import { userRepoProvider } from './repo/user/user.repo';
@Module({
    providers: [userRepoProvider],
    exports: [userRepoProvider],
})
export class InfraModule {}