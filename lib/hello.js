var _         = require('underscore');
var request   = require('request');
var formatter = require('./string-formatter');
var Champion  = require('../db/schema/champion');
var apikey    = '0263dea8-144b-404e-a67f-ccb67a112634';

function populateDb() {
  var isPop = false;
  var allChampsUrl = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json';
  var singleChampUrl = function(name) {
    return 'http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion/'+name+'.json';
  };

  if (!isPop) {

    // request list of all champions
    request(allChampsUrl, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var b = JSON.parse(body);
        var data = b.data;

        // array of all champ names
        var champNames = _.map(data, function(champ) {
          var formatted = formatter(champ.name);
          return formatted;
        });

        // iterate over each champ name, and then
        // req indv champ's data
        _.each(champNames, function(name) {
          request(singleChampUrl(name), function(error, response, body) {
            if (!error && response.statusCode == 200) {
              var b = JSON.parse(body);
              var data = b.data;
              console.log(data)
            }
          })
        })


      }
    });

  }


  
}

module.exports = {
  populateDb: populateDb
}