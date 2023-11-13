import { IsNotEmpty, IsString } from "class-validator";
import { UserGender } from "src/core/domains/user/enums";



export class BaseUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class UserDto extends BaseUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    // gender: UserGender;
    gender: number;

}

export class UserSigninDto extends BaseUserDto { }


export class ChangePassword {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
    
}