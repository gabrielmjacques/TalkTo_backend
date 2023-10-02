import { IUser } from "../Interfaces/IUserModel";

export class UserModel implements IUser {
    id: string;
    username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }
}