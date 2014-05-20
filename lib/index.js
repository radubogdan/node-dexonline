// Dependencies
var request = require('request'),
    cheerio = require('cheerio');

/**
 *  Helper function requestDefinitionOrText (suffix) is a function builder.
 *
 *  Arguments
 *    - suffix: String representing a path in the URL
 *
 *  Returns an anonymous function with 2 arguments, the word you search and a
 *  callback function. The anonymous function is going to return a request at
 *  dexonline.ro.
 *
 */
function requestDefinitionOrText(suffix) {
    "use strict";

    return function(word, callback) {
        return request('http://dexonline.ro/' + suffix + '/' + word, function(err, res, body) {
            if(!err && res.statusCode === 200) {
                var $ = cheerio.load(body);
                var def = $('.def');
                callback(null, def);
            } else {
                callback(err, null);
            }
        });
    };
}

/**
 *  Dexonline Object
 *  node-dexonline is a simple interface to the dexonline.ro service
 *
 */
var Dexonline = {
    definitie: requestDefinitionOrText('definitie'),
    text: requestDefinitionOrText('text')
};

module.exports = Dexonline;
