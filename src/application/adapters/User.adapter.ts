import { Body, Controller, Delete, Get, Param,Put, Patch } from '@nestjs/common';
import { UserDto } from '../dto/d';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindUserCommand } from 'src/core/command/find-user/find-user-command';

// import { CreateUserCommand } from 'src/core/command/create-user-command';
import { CreateUserCommand } from 'src/core/command/create-user/create-user-command';
@Controller('users')
export class UserAdapter {
    constructor(
        private readonly commmandBus:CommandBus,
        private readonly queryBus:QueryBus
    ) {
    }
    @Get('/:username')
    async findByUserName(@Param('username') username) {
        return await this.commmandBus.execute(new FindUserCommand({username}))
    }
    @Put('/:id') 
    async updateUser(@Param('id') id) {
        return "pham van hai"
    }
}