import { randomUUID } from "crypto";
import { UserPassword } from "./user-password";
import { UserGender } from "./enums";

interface UserProps {
    id?: string;
    name: string;

    username: string;
    password: UserPassword;
    // gender: UserGender;
    gender: number;
    createAt?: number;
    updateAt?: number;
    version?: number;
}


export class User {
    private _username: string;
    private _name: string;

    private _password: UserPassword | string;
    // private _gender: UserGender;
    private _gender: number;

    private _id: string;
    private _createAt: number;
    private _updateAt: number;
    private _version: number;

    protected constructor(userProps: UserProps) {
        this._id = userProps.id;
        // this._gender = userProps.gender;
        this._gender = userProps.gender;

        this._name = userProps.name;
        this._username = userProps.username;
        this._password = userProps.password.getPassword();
        this._createAt = userProps.createAt;
        this._updateAt = userProps.updateAt;
        this._version = userProps.version;
    }


    static create(userProps: UserProps): User {
        const user = new User(userProps);
        if (!user._id) user._id = randomUUID()
        
        return user;
    }


    get id(): string {
        return this._id;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password.toString();
    }

    get gender() {
        return this._gender;
    }

    get name() {
        return this._name;
    }

    get createAt() {
        return this._createAt;
    }

    get updateAt() {
        return this._updateAt;
    }

    get version() {
        return this._version;
    }


    set name(name: string) {
        this._name = name;
    }

    set username(username: string) {
        this._username = username;
    }

    // set gender(gender: UserGender) {
    //     this._gender = gender;
    // }
    set gender(gender: number) {
        this._gender = gender;
    }

    set createAt(now: number) {
        this._createAt = now;
    }

    set updateAt(time: number) {
        this._updateAt = time;
    }

    set version(ver: number) {
        this._version = ver;
    }
    

}