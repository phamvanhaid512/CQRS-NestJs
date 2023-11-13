import { Module } from '@nestjs/common';
import { UserAdapter } from './adapters/User.adapter';
import { CommandBus } from '@nestjs/cqrs';
import {AuthAdapter} from './adapters/Auth.adapter'
@Module({
    imports:[],
    controllers:[UserAdapter,AuthAdapter]
})
export class ApplicationModule {}