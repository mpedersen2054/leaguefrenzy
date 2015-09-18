var summoners = {};
summoners._apiKey = 'a85d0753-6824-4725-a76f-23be84110e08';
summoners._prevSearches = [];
summoners._searchDone = false;
summoners._currentSearch;
summoners._staticChamps = sc || {};


summoners.getUri = function(name) {
  function getEndpoint(region, type, inp) {
    if (type === 0) return 'https://' + region + '.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + inp +'?api_key=' + summoners._apiKey;
    else if (type === 1) return 'https://' + region + '.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + inp + '/ranked/' +'?api_key=' + summoners._apiKey;
    else if (type === 2) return 'https://' + region + '.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + inp + '/entry/' +'?api_key=' + summoners._apiKey;
    else if (type === 3) return 'https://' + region + '.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + inp + '/entry/' +'?api_key=' + summoners._apiKey;
    else console.log('error!');
  }
  this.general = getEndpoint( 'na', 0, name )
  this.champs  = function( id ) { return getEndpoint( 'na', 1, id ) }
  this.league  = function( id ) { return getEndpoint( 'na', 2, id ) }
  this.hello   = 'hello there'
  return { general: this.general, champs: this.champs, league: this.league, hello: this.hello }
}


var sumsearch = $('#summoner-form');
var spinner = $('<i class="fa fa-circle-o-notch fa-spin" style="font-size: 2em; position: relative; left: 50%; color: #2F3F4F;"></i>');
var spinnerCont = $('.summoner-list-area').children('.spinner-container');
sumsearch.on('submit', function(e) {
  e.preventDefault();
  spinnerCont.append(spinner);

  var sum = $('#summoner-filter').val().trim().replace(' ', '');
  var url = summoners.getUri(sum).general;
  // gSD callback
  gatherSummonerData({sum: sum, url: url}, function(err, data) {
    if (err) { return handleNoSum(err) }
    if (!err && data) { return handleFoundSum(data) }
  })
});

var handleNoSum = function(err) {
  console.log('this is called when the champ is not found!!!!')
}

var handleFoundSum = function(data) {
  console.log('this is called when summ found!!', data)
}


var gatherSummonerData = function(options, callback) {

  if (typeof options != 'object') { callback('no options object', null) }

  this.getGeneral = function(sum, url) {
    var self = this;
    $.ajax({
      type: 'GET',
      url: url
    }).done(function(res) {
      var s         = {};
      s.id          = res[sum].id;
      s.name        = res[sum].name;
      s.profileIcon = res[sum].profileIconId;
      self.getRankedChamps(s);
    }).fail(function(jqxhr, textStatus, error) {
      callback(error, null)
    })
  }(options.sum, options.url)

  this.getRankedChamps = function(data) {
    var self = this;
    var s = data;
    var url = summoners.getUri().champs(s.id);

    $.ajax({
      type: 'GET',
      url: url
    }).done(function(res) {
      s.rankedChamps   = res.champions;
      s.lastRankedPlay = res.modifyDate;

      self.formatRankedChamps(s);

    }).fail(function(jqxhr, textStatus, error) {
      callback(error, null)
    })
  }

  this.formatRankedChamps = function(data) {
    var self       = this;
    var s          = data;
    var rc         = s.rankedChamps;
    var sc         = [];
    var champsDict = summoners._staticChamps.data;

    // turn champsDict into array named sc
    for (var k in champsDict) {
      var cid = +champsDict[k].key;
      var name = champsDict[k].id;
      var thumb = champsDict[k].image.full;
      sc.push({ cid: cid, name: name, thumb: thumb });
    }

    // add name & thumb to each champ in s.rankedChamps
    _.each(rc, function(c, i) {
      var cid = c.id;
      var z = _.find(sc, function(x) { return x.cid === cid });
      c.info = z;
    });

    delete s.rankedChamps
    s.rankedChamps = rc;

    self.getRankedStats(s);
  }


  this.getRankedStats = function(data) {
    var s = data;
    var url = summoners.getUri().league(s.id);

    $.ajax({
      type: 'GET',
      url: url
    }).done(function(res) {
      var r = res[s.id][0], re = res[s.id][0].entries[0];
      s.rankedStats              = {};
      s.rankedStats.leagueName   = r.name;
      s.rankedStats.tier         = r.tier;
      s.rankedStats.wins         = re.wins;
      s.rankedStats.loses        = re.losses;
      s.rankedStats.division     = re.division;
      s.rankedStats.isHotStreak  = re.isHotStreak;
      s.rankedStats.isVeteral    = re.isVeteran;
      s.rankedStats.leaguePoints = re.leaguePoints;

      callback(null, s);

    }).fail(function(jqxhr, textStatus, error) {
      callback(error, null);
    })
  }

}




