var 
launcher = require( 'browser-launcher' )

module.exports = function ( opts, callback ) {

    launcher(function ( err, launch ) {
        if (err) return callback( err )

        var options = {
                headless: opts.headless,
                browser: opts.browser
            },
            url = 'http://localhost:' + opts.port 

        launch( url, options, function (err, ps) {
            if (err) return callback( err )

            callback( null, {
                process: ps
            } )
        } )
    })

}