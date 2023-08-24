const app = require( 'express' )();
const server = require( 'http' ).createServer( app );
const io = require( 'socket.io' )( server, { cors: { origin: 'http://localhost:5173' } } );


io.on( 'connection', socket => {
    console.log( `User: ${ socket.id } as connected` )

    socket.on( 'disconnect', reason => {
        console.log( `User ${ socket.data.username } as diconnected` )
    } )

    socket.on( 'set_username', username => {
        socket.data.username = username

        console.log( `Name setted as ${ username }` )
    } )
} )


server.listen( 3000, () => {
    console.log( 'Server running on port 3000' );
} )