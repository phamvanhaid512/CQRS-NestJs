import { User } from "src/core/domains/user/user";
import { UserCas } from "./user-cars";
import { CasMapper } from "src/infra/models/cas-mapper";
import cassandra from 'cassandra-driver'
import { UserPassword } from "src/core/domains/user/user-password";

export class UserDaoMapper implements CasMapper<User, UserCas> {
    fromDomain(user: User): UserCas {
        //  throw new Error('Method not implemented.');
        const { id, username, password, gender, name, createAt, updateAt, version } = user;
        return {
            id,
            username,
            password,
            gender,
            name,
            create_at: createAt,
            update_at: updateAt,
            version
        }
    }
    //Chuyen du lieu tu Cassandra -> Du lieu model
    toDomain(data: UserCas): User {
        const { username, password, id, gender, name, create_at, update_at, version } = data;
        return User.create({ username, password: UserPassword.createFromHashedPwd(password.toString()), 
            gender, name, createAt: create_at, updateAt: update_at, version })
    }
}
