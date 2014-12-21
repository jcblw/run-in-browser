
var http = require( 'http' ),
    shoe = require( 'shoe' ),
    utils = require( '../shared/utils' ),
    through = require( 'through' ),
    ecstatic = require( 'ecstatic' )( __dirname + '/../client' )

module.exports = function( opts ) {
    var emitter = opts.emitter,
        server = http.createServer( ecstatic ),
        port = opts.port || 9090,
        sock = shoe( handleStream ),
        ogEmit = emitter.emit;

    function handleStream( stream ) {
        
        stream.pipe( through( eventTransform ) );

        emitter.emit = function ( ) {
            var args = utils.makeArray( arguments )
            if ( typeof args[ 0 ] === 'string' ) {
                stream.write( JSON.stringify( args ) ); // this sends an event to the server
                return
            }
            else if ( typeof args[ 0 ] === 'boolean' ) {
                args.shift()
                ogEmit.apply( emitter, args ); // this should trigger a normal event
            }
        }
    }

    function eventTransform( msg ) {
        var data = utils.deserialize( msg )
        if ( utils.isEvent( data ) ) {
            data.unshift( true ) // added true to first param to send data out from normal emitter
            emitter.emit.apply( emitter, data )
        }
        this.queue( msg )
    }

    server.listen( port );
    sock.install( server, '/~SERVER' );

    if ( opts.output ) opts.output.write( 'Server listening on port ' + port );
    
    return {
        server: server,
        emitter: emitter,
        sock: sock,
        port: port
    }
}
