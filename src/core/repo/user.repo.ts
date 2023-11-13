import { User } from "../domains/user/user";

export const USER_REPO = Symbol.for('USER_REPO')


export interface UserRepo {
    create(User): Promise<Boolean>;
    findByUserName(user: string): Promise<User>;
    // findUserByUserId(userId: string): Promise<any>;
    remove(userId: string): Promise<Boolean>;
    get(id: string): Promise<User>;
    getAll(): Promise<User[]>;
    update(User, options: { includePassword: String | false }): Promise<Boolean>;    
}