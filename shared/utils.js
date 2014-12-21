var deserialize =
module.exports.deserialize = function ( msg ) {
    var ret
    try {
        ret = JSON.parse( msg )
    } catch ( e ) {
        ret = null
    }
    return ret
}

var makeArray =
module.exports.makeArray = function ( arr ) {
    return Array.prototype.slice.call( arr, 0 )
}

var isEvent
module.exports.isEvent = function ( msg ) {
    if ( Array.isArray( msg ) && typeof msg[ 0 ] === 'string' ) {
        return true
    }
    return false
}