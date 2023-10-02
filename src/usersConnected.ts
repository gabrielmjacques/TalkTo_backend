let usersConnected: Array<any> = [];

export const users = {

    hasUser: (username: string) => {
        return usersConnected.includes(username);
    },

    getUsers: () => {
        return usersConnected;
    },

    addUser: (username: string) => {
        usersConnected.push(username);
    },

    removeUser: (username: string) => {
        usersConnected = usersConnected.filter(user => user !== username);
    },

    getConnectedUsersLength: () => {
        return usersConnected.length;
    }

};