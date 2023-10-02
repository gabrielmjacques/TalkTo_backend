import { IRoomModel } from "../Interfaces/IRoomModel";
import { UserModel } from "./UserModel";

export class RoomModel implements IRoomModel {
    roomName: string;
    roomDescription: string;
    users: Array<UserModel>;

    constructor(roomName: string, roomDescription: string, users: Array<UserModel>) {
        this.roomName = roomName;
        this.roomDescription = roomDescription;
        this.users = users;
    }

    public addUser(user: UserModel) {
        this.users.push(user);
    }

    public removeUser(socketID: string) {
        this.users = this.users.filter((u) => u.id !== socketID);
    }

    public searchUser(user: UserModel) {
        return this.users.find((u) => u.username === user.username);
    }

    public getAllUsers() {
        return this.users;
    }
}