import { RoomModel } from "../Models/RoomModel";

let rooms: Array<RoomModel> = [
    new RoomModel("Room 1", "This is room 1", []),
    new RoomModel("Room 2", "This is room 2", []),
];

export const getRooms = () => {
    return rooms;
};

export const getRoom = (roomName: string) => {
    return rooms.find(room => room.roomName === roomName);
};