var browserify = require( 'browserify' ),
    merge = require( 'merge' ),
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    server = require( './src/server' );

module.exports = RunInBrowser

function RunInBrowser( opts ) {
    
    var options = merge( opts, { emitter : this } ),
        setup = server( opts );

    this._sock = setup.sock;
    this.port = setup.port;
    this.server = setup.server;
    this.scripts = [];
    EventEmitter2.call( this, opts.events )
    this.on( 'connection', this._runScripts.bind( this ) );
}

RunInBrowser.prototype = Object.create( EventEmitter2.prototype );

RunInBrowser.prototype.require = function( entry ) {
    var error = this.emit.bind( this, true, 'error' ),
        pushScript = this.scripts.push.bind( this.scripts )

    browserify( process.cwd() + entry )
        //.require( './client/server.js', { expose: 'server' } )
        // need to revise this to access global var
        .bundle( function( err, buf ) {
            if ( err ) return error( err )
            pushScript( buf.toString( 'utf8' ) )
        } )
}

RunInBrowser.prototype._runScripts = function ( ) {
    console.log( 'new connection' );
    runCode = this.emit.bind( this, 'RUNCODE' );
    this.scripts.forEach( runCode );
}