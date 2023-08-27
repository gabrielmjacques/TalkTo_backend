const app = require( 'express' )();
const cors = require( 'cors' )();
const server = require( 'http' ).createServer( app );
const io = require( 'socket.io' )( server, { cors: { origin: 'http://localhost:5173' } } );
const routes = require( './routes' );

const { users } = require( './usersConnected' );

app.use( cors )
app.use( routes )

io.on( 'connection', socket => {
    console.log( `User: ${ socket.id } as connected` )

    socket.on( 'disconnect', reason => {
        console.log( `User ${ socket.id } as diconnected` )
    } )

    socket.on( 'checkUsername', ( username, callback ) => {
        if ( users.hasUser( username ) ) {
            callback( false )
        } else {
            users.addUser( username )
            callback( true )
        }
    } )

    socket.on( 'setUsername', username => {
        socket.data.username = username

        console.log( `User ${ socket.id } as new name: ${ socket.data.username }` )

        socket.emit( 'userSet', username )

    } )
} )


server.listen( 3000, () => {
    console.log( 'Server running on port 3000' );
} )