console.clear();

const app = require('express')();
const cors = require('cors')();
const server = require('http').createServer(app);
const io: Socket = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } });

import { Socket } from "socket.io";
import { getRoom, getRooms } from "./Data/rooms";

// Interfaces/Models
import MessageModel from "./Models/MessageModel";
import { UserModel } from "./Models/UserModel";
import { IMessageModel } from "./Interfaces/IMessageModel";

app.use(cors);

// Conection
io.on('connection', (socket: Socket) => {
    console.log(`User: ${socket.id} as connected`);

    socket.emit("rooms", getRooms());

    // On Disconnect
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} as diconnected`);

        const room = getRoom(socket.data.room);

        if (room) {
            room.removeUser(socket.id);
            socket.leave(room.roomName);
        }
    });

    // On Check Room
    socket.on('checkRoom', ({ username, room }, callback: Function) => {
        const serverRoom = getRoom(room);

        if (!serverRoom) {
            return callback({ error: 'Room not found' });
        }

        const user = serverRoom.users.find((user: any) => user.username === username);

        if (user) {
            return callback({ error: 'Username already exists' });
        }

        socket.data.username = username;
        socket.data.room = room;
        serverRoom.addUser(new UserModel(socket.id, username));
        socket.join(serverRoom.roomName);

        return callback({ error: null });
    });

    // On Set Username
    // socket.on('setUsername', (username: string) => {
    //     socket.data.username = username;

    //     console.log(`User ${socket.id} set a new name: ${socket.data.username}`);

    // });

    // On Send Message
    socket.on('sendMessage', (receive_message: IMessageModel) => {

        const newMessage = new MessageModel(
            receive_message.user,
            receive_message.message,
            receive_message.date,
            receive_message.time,
            receive_message.milliseconds
        );

        io.to(socket.data.room).emit('receiveMessage', newMessage);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});