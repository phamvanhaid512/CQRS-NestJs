import { UserPassword } from "src/core/domains/user/user-password";
import { UserGender } from "src/core/domains/user/enums";

export interface UserCas {
    id: any;
    username: string;
    password: string | UserPassword;
    // gender: UserGender;
    gender: number;
    name: string;
    create_at: number;
    update_at: number;
    version: number;
}
