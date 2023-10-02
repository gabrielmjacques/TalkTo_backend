import { UserModel } from "../Models/UserModel";

export interface IRoomData {
    roomName: string;
    roomDescription: string;
    users: UserModel[];
}