export interface IMessageModel {
    user: {
        id: number;
        name: string;
    };
    message: string;
    date: string;
    time: string;
    milliseconds: number;
}