const app = require( 'express' )();
const cors = require( 'cors' )();
const server = require( 'http' ).createServer( app );
const io = require( 'socket.io' )( server, { cors: { origin: 'http://localhost:5173' } } );
const routes = require( './routes' );

const { users } = require( './usersConnected' );

app.use( cors )
app.use( routes )

// Conection
io.on( 'connection', socket => {
    console.log( `User: ${ socket.id } as connected` )

    // On Disconnect
    socket.on( 'disconnect', reason => {
        console.log( `User ${ socket.id } as diconnected` )
        users.removeUser( socket.data.username )
    } )

    // On Check Username
    socket.on( 'hasUsername', ( username, callback ) => {
        if ( users.hasUser( username ) ) {
            callback( true )
        } else {
            users.addUser( username )
            callback( false )
        }

        console.log( `Users connected: ${ users.getUsers() }` )
    } )

    // On Set Username
    socket.on( 'setUsername', username => {
        socket.data.username = username

        console.log( `User ${ socket.id } set a new name: ${ socket.data.username }` )

    } )
} )


server.listen( 3000, () => {
    console.log( 'Server running on port 3000' );
} )