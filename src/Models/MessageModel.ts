import { IMessageModel } from "../Interfaces/IMessageModel";

export default class MessageModel implements IMessageModel {
    user: { id: string; name: string; };
    username: string;
    message: string;
    date: string;
    time: string;
    milliseconds: number;

    constructor(user: { id: string; name: string; }, message: string, date: string, time: string, milliseconds: number) {
        this.user = user;
        this.username = user.name;
        this.message = message;
        this.date = date;
        this.time = time;
        this.milliseconds = milliseconds;
    }
}