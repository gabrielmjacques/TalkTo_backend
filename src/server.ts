console.clear();

const app = require('express')();
const cors = require('cors')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } });

const { users } = require('./usersConnected');

// Interfaces
import { Socket } from "socket.io";
import { IMessageModel } from "./Interfaces/IMessageModel";
import MessageModel from "./Models/MessageModel";

app.use(cors);

// Conection
io.on('connection', (socket: Socket) => {
    console.log(`User: ${socket.id} as connected`);

    // On Disconnect
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} as diconnected`);
        users.removeUser(socket.data.username);
    });

    // On Check Username
    socket.on('hasUsername', (username: string, callback: Function) => {
        if (users.hasUser(username)) {
            callback(true);
        } else {
            users.addUser(username);
            callback(false);
        }

        console.log(`Users connected: ${users.getUsers()}`);
    });

    // On Set Username
    socket.on('setUsername', (username: string) => {
        socket.data.username = username;

        console.log(`User ${socket.id} set a new name: ${socket.data.username}`);

    });

    // On Send Message
    socket.on('sendMessage', (receive_message: IMessageModel) => {

        const newMessage = new MessageModel(
            receive_message.user,
            receive_message.message,
            receive_message.date,
            receive_message.time,
            receive_message.milliseconds
        );

        io.emit('receiveMessage', newMessage);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});