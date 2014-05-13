// Dependencies
var request = require('request')
  , cheerio = require('cheerio');

function requestDefinitionOrText(suffix) {
    return function(word, callback) {
        return request('http://dexonline.ro/' + suffix + '/' + word, function(err, res, body) {
            if(!err && res.statusCode == 200) {
                var $ = cheerio.load(body);
                var def = $('.def').text();

                callback(null, def);
            }
        });
    }
}

var Dexonline = {
    definitie: requestDefinitionOrText('definitie')
  , text: requestDefinitionOrText('text')
};

module.exports = Dexonline;
