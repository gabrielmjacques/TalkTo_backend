export interface IMessageModel {
    user: {
        id: string;
        name: string;
    };
    message: string;
    date: string;
    time: string;
    milliseconds: number;
}