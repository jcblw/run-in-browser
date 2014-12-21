var shoe = require( 'shoe' ),
    through = require( 'through' ),
    EventEmitter = require( 'eventemitter2' ).EventEmitter2,
    utils = require( '../shared/utils' ),
    stream = shoe( '/~SERVER' ),
    emitter = new EventEmitter(),
    ogEmit = emitter.emit

window._SERVER_ = emitter

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

function eventTransform( msg ) {
    var data = utils.deserialize( msg )
    if ( utils.isEvent( data ) ) {
        data.unshift( true ) // added true to first param to send data out from normal emitter
        emitter.emit.apply( emitter, data )
    }
    this.queue( msg )
}

stream.pipe( through( eventTransform ) )

emitter.on( 'RUNCODE', function( code ) {
    var script = document.createElement( 'script' );

    script.innerHTML = code;
    document.body.appendChild( script );
} );

emitter.emit( 'connection' ); // emit connection to server
