var run = require( 'browser-run' ),
    browserify = require( 'browserify' ),
    EventEmitter2 = require('eventemitter2').EventEmitter2

module.exports = RunInBrowser

function RunInBrowser( opts ) {
    EventEmitter2.call( this, opts.events )
    this.browser = run( opts );
    this.browser.on( 'data', this._onData.bind( this ) );
    if ( opts.output ) {
        this.browser.pipe( opts.output );
    }
}

RunInBrowser.prototype = Object.create( EventEmitter2.prototype, {
    
    require: function( entry ) {
        browserify( process.cwd() + entry )
            .require( './client/server.js', { expose: 'server' } )
            .bundle()
            .pipe( this.browser )
    },

    _onData: function( data ) {
        // convert data into an event data if data is in proper form
        var _event

        try {
            _event = JSON.parse( data.toString( 'utf8' ) ) 
        } catch ( e ) {
            _event = null
        }

        if ( Array.isArray( _event ) && typeof _event[ 0 ] === 'string' ) {
            this.emit.appy( this, _event );
        }

        // do nothing with data if it does not match event pattern
    }

});