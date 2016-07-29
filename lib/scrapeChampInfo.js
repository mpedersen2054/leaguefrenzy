var _         = require('underscore');
var request   = require('request');
var async     = require('async');
var cheerio   = require('cheerio');
var formatter = require('./string-formatter');
var Champion  = require('../db/schema/champion');
var apikey    = '0263dea8-144b-404e-a67f-ccb67a112634'; // pls dont hax me


function populateChamps() {
  var allChampsUrl   = 'https://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json';
  var singleChampUrl = function(name) { return 'https://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion/'+formatter.forApi(name)+'.json'; };
  var thumbnailUrl   = function(name) { return 'https://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'+formatter.forApi(name)+'.png'; };
  var splashUrl      = function(name) { return 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+formatter.forApi(name)+'_0.jpg'; };

  Champion.find(function(err, champs) {
    if (champs.length === 0) {
      // request list of all champions
      request(allChampsUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var b = JSON.parse(body);
          var data = b.data;

          // array of all champ names
          var champNames = _.map(data, function(champ) {
            var formatted = formatter.forApi(champ.name);
            return formatted;
          });

          // iterate over each champ name, and then
          // req indv champ's data
          _.each(champNames, function(name) {
            request(singleChampUrl(name), function(error, response, body) {
              if (!error && response.statusCode == 200) {
                var b = JSON.parse(body);
                var data = b.data[name];
                var cd = {};

                var spellName, spellImage;
                var spells = _.map(data.spells, function(s) {
                  spellName = s.name;
                  spellImage = s.image.full;
                  return { name: spellName, image: spellImage }
                })

                var passive = {
                  name: data.passive.name,
                  image: data.passive.image.full
                }

                spells.unshift(passive); // place passive at spells[0]

                var url = 'http://www.championselect.net/champions/';
                async.series({
                  badAgainst: function(callback){
                    setTimeout(function(){
                      request(url+name+'/weak', function(err, res, html) {
                        var weak = [];
                        if (!err && res.statusCode == 200) {
                          var $ = cheerio.load(html);

                          $('.weak-block').filter(function() {
                            var data = $(this);
                            var cBlock = data.children('.champ-block');
                            _.each(cBlock, function(cbl) {
                              var cName = $(cbl).children('.theinfo').children().first().attr('href').split('/')[2];
                              var cInfo = $(cbl).children('.theinfo').children('.info').children();
                              var cPos = cInfo.first().text();
                              var cupvote = cInfo.first().next().text();
                              var cdownvote = cInfo.first().next().next().text();

                              weak.push({
                                champName: name,
                                counterName: formatter.forApi(cName).toLowerCase(),
                                position: cPos,
                                upvotes: parseInt(+cupvote.trim().replace(',', '') / 100),
                                downvotes: parseInt(+cdownvote.trim().replace(',', '') / 100)
                              })
                            })
                          });

                          callback(null, weak);
                        }
                      });

                    }, 200);
                  },
                  goodAgainst: function(callback){
                    setTimeout(function(){
                      request(url+name+'/strong', function(err, res, html) {
                        var strong = [];
                        if (!err && res.statusCode == 200) {
                          var $ = cheerio.load(html);

                          $('.weak-block').filter(function() {
                            var data = $(this);
                            var cBlock = data.children('.champ-block');
                            _.each(cBlock, function(cbl) {
                              var cName = $(cbl).children('.theinfo').children().first().attr('href').split('/')[2];
                              var cInfo = $(cbl).children('.theinfo').children('.info').children();
                              var cPos = cInfo.first().text();
                              var cupvote = cInfo.first().next().text();
                              var cdownvote = cInfo.first().next().next().text();

                              strong.push({
                                champName: name,
                                counters: formatter.forApi(cName).toLowerCase(),
                                position: cPos,
                                upvotes: parseInt(+cupvote.trim().replace(',', '') / 100),
                                downvotes: parseInt(+cdownvote.trim().replace(',', '') / 100)
                              })
                            })
                          });

                          callback(null, strong);
                        }
                      });
                    }, 100);
                  }
                },
                function(err, results) {
                  var cd = {};

                  function capitalize(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
                  }

                  cd.counter             = {}
                  cd.counter.badAgainst  = results.badAgainst;
                  cd.counter.goodAgainst = results.goodAgainst;
                  cd.name                = data.name;
                  cd.title               = data.title;
                  cd.slug                = formatter.forApi(data.name).toLowerCase();
                  cd.image               = {};
                  cd.image.thumbnail     = thumbnailUrl(data.name);
                  cd.image.splash        = splashUrl(data.name);
                  cd.allyTips            = data.allytips;
                  cd.enemyTips           = data.enemytips;
                  cd.tags                = data.tags;
                  cd.info                = {};
                  cd.info.attack         = data.info.attack * 10;
                  cd.info.defense        = data.info.defense * 10;
                  cd.info.magic          = data.info.magic * 10;
                  cd.info.difficulty     = data.info.difficulty * 10;
                  cd.spells              = spells;

                  var champ = new Champion(cd);
                  champ.save(function(err, c) {
                    console.log(c.name + ' created!');
                  });
                });
              }
            })
          })
        }
      });
    }
  })
}

module.exports = populateChamps;
