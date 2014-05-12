// Dependencies
var request = require('request')
  , cheerio = require('cheerio')
  ;

var Dexonline = {

    definitie: function(word) {

        request('http://dexonline.ro/definitie/' + word, function(err, res, body) {
            if(!err && res.statusCode == 200) {
                var $ = cheerio.load(body);

                console.log($('.def').text());
            }
        });

    }
};

module.exports = Dexonline;
