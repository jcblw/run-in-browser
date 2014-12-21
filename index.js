var 
browserify = require( 'browserify' ),
merge = require( 'merge' ),
EventEmitter2 = require('eventemitter2').EventEmitter2,
server = require( './src/server' ),
exposify = require( 'exposify' ),
launcher = require( './src/launcher' )

exposify.config = { server: '_SERVER_' }

module.exports = RunInBrowser

function RunInBrowser( opts ) {
    
    var 
    options = merge( opts, { emitter : this } ),
    setup = server( opts )

    this._sock = setup.sock
    this.port = setup.port
    this.server = setup.server
    this.scripts = []
    EventEmitter2.call( this, opts.events )
    setImmediate( this._init.bind( this, options ) );
}

RunInBrowser.prototype = Object.create( EventEmitter2.prototype )

RunInBrowser.prototype.require = function( entry ) {

    browserify( process.cwd() + '/' + entry )
        .transform( exposify )
        .bundle( this._onBundle.bind( this ) )
}

RunInBrowser.prototype._init = function( opts ) {

    this.on( 'connection', this._runScripts.bind( this ) )
    launcher( opts, this._onLaunch.bind( this ) )
}

RunInBrowser.prototype._onBundle = function( err, buf ) {

    if ( err ) return this.emit( true, 'error', err )
    this.scripts.push( buf.toString( 'utf8' ) )
    if ( this.browser ) {
        this._runScripts( )
    }
}

RunInBrowser.prototype._onLaunch = function( err, browser ) {

    if ( err ) return this.emit( true, 'error', err )
    this.browser = browser.process
}

RunInBrowser.prototype._runScripts = function( ) {

    var
    runCode = this.emit.bind( this, 'RUNCODE' )
    this.scripts.forEach( runCode )
}