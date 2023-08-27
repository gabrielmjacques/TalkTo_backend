let usersConnected = []

const users = {

    hasUser: ( username ) => {
        return usersConnected.includes( username )
    },

    addUser: ( username ) => {
        usersConnected.push( username )
    }

}

module.exports = { users }