var test = require( 'tape' ),
    runInBrowser = require( '../' );

test( 'testing runInBrowser', function( t ) {
    t.equals( typeof runInBrowser, 'function', 'runInBrowser is a function' );
    t.end();
} );
