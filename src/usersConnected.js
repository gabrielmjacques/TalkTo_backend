let usersConnected = []

const users = {

    hasUser: ( username ) => {
        return usersConnected.includes( username )
    },

    getUsers: () => {
        return usersConnected
    },

    addUser: ( username ) => {
        usersConnected.push( username )
    },

    removeUser: ( username ) => {
        usersConnected = usersConnected.filter( user => user !== username )
    },

    getConnectedUsersLength: () => {
        return usersConnected.length
    }

}

module.exports = { users }