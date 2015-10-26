
var summoners = summoners || {

  _apiKey: 'a85d0753-6824-4725-a76f-23be84110e08',
  _prevSearches: [],
  _searchDone: false,
  _staticChamps: sc || {},

  init: function() {
    var self = this;
    self.sumListArea = $('.summoner-list-area');

    self.submitSummoner();
  },

  submitSummoner: function() {
    var sumsearch = $('#summoner-form');
    var input = $('#summoner-filter');
    var spinnerCont = $('.spinner-container');

    // remove the container for the spinner
    // and the list area when page first visited
    spinnerCont.detach();
    self.self.sumListArea.detach();

    sumsearch.on('submit', function(e) {
      e.preventDefault();

      var sumName = input.val().replace(/\W/g, '');
      var url = summoners.getUri(sumName).general;

      spinnerCont.show();
      $('.meta').remove();
      $('.ranked-champs').remove();
      $('#summoners-page .fluid-container').append(spinnerCont);

      // gatherSummonerData callback function
      gatherSummonerData({sum: sumName, url: url}, function(err, data) {
        if (err) { return handleNoSum(err, sumName) }
        if (!err && data) { return handleFoundSum(data) }
      });

      var handleNoSum = function(err, sn) {
        console.log(sn);
        var sum = $('<span></span>').text(sn);
        var ncf = $('<div>').addClass('no-summoner-found').text(' not found! Try again.').prepend(sum);
        $('.search').after(ncf)
        spinnerCont.hide();
        input.val('');
      }

      var handleFoundSum = function(data) {
        $('.no-summoner-found').remove();
        spinnerCont.hide();
        summoners.appendHTML(data);
        summoners._prevSearches.push(input.val());
        input.val('');
      }

    })
  },

  getUri = function(name) {
    function getEndpoint(region, type, inp) {
      if (type === 0) return 'https://' + region + '.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + inp +'?api_key=' + summoners._apiKey;
      else if (type === 1) return 'https://' + region + '.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/' + inp + '/ranked/' +'?api_key=' + summoners._apiKey;
      else if (type === 2) return 'https://' + region + '.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + inp + '/entry/' +'?api_key=' + summoners._apiKey;
      else if (type === 3) return 'https://' + region + '.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + inp + '/entry/' +'?api_key=' + summoners._apiKey;
      else console.log('error!');
    }
    this.general = getEndpoint( 'na', 0, name );
    this.champs  = function( id ) { return getEndpoint( 'na', 1, id ) }
    this.league  = function( id ) { return getEndpoint( 'na', 2, id ) }
    this.hello   = 'hello there';
    return { general: this.general, champs: this.champs, league: this.league, hello: this.hello }
  }
}

// get different info and use callback for when all info is collected
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

    function sortByName(a, b) {
      var aName = a.stats.totalSessionsPlayed;
      var bName = b.stats.totalSessionsPlayed;
      return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
    }

    $.ajax({
      type: 'GET',
      url: url
    }).done(function(res) {
      s.rankedChamps   = res.champions;
      s.lastRankedPlay = res.modifyDate;

      s.rankedChamps.sort(sortByName);
      s.rankedChamps.pop();
      console.log(s.rankedChamps);

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

    delete s.rankedChamps;
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

summoners.appendHTML = function(data) {
  var rankedStats = data.rankedStats;
  var rankedCh = data.rankedChamps;
  // after all done, append html string to self.sumlistarea
  var html = '';

  // meta
  html+='<div class="meta well">';
  html+= '<div class="general clearfix">';
  html+=  '<img src="//ddragon.leagueoflegends.com/cdn/5.18.1/img/profileicon/'+data.profileIcon+'.png">';
  html+=  '<h2>'+data.name+'</h2>';
  html+= '</div>';
  html+= '<div class="ranked-stats row">';
  html+=  '<div class="col-md-6 col-sm-12 col-xs-12">';
  html+=   '<div class="league-stats">';
  html+=    '<div>'+rankedStats.tier+' <span>'+rankedStats.division+'</span> | <span>'+rankedStats.leaguePoints+' LP</span></div>';
  html+=   '</div>';
  html+=   '<div class="league-name">'+rankedStats.leagueName+'</div>';
  html+=  '</div>';
  html+=  '<div class="col-md-2 col-sm-12 col-xs-12 special">';
            if (rankedStats.isHotStreak) { html+= '<span><i class="fa fa-fire"></i></span>'; }
            if (rankedStats.isVeteral) { html+= '<span><i class="fa fa-star"></i></span>'; }
  html+=  '</div>';
  html+=  '<div class="col-md-4 col-sm-12 col-xs-12">';
  html+=   '<div class="wl"><span>wins</span> '+rankedStats.wins+'</div>';
  html+=   '<div class="wl"><span>loses</span> '+rankedStats.loses+'</div>';
  html+=  '</div>';
  html+= '</div>'; // close .ranked-stats
  html+='</div>'; // close .meta

  // ranked-champs
  html+='<div class="ranked-champs well">';
  html+= '<div class="heading row">';
  html+=  '<div class="col-md-12">';
  html+=   '<h2>ranked champs</h2>';
  html+=   '<input type="text" id="ranked-champ-filter" placeholder="Enter champ...">';
  html+=  '</div>';
  html+= '</div><hr>';
  html+= '<div class="champ-list row">';

  // each ranked-champ
  for (var champ in rankedCh) {
    var cHtml = '';
    if (rankedCh[champ].id == 0 || rankedCh[champ].info == undefined) continue;
    var thumb = '//ddragon.leagueoflegends.com/cdn/5.18.1/img/champion/'+rankedCh[champ].info.thumb;
    var name = rankedCh[champ].info.name;
    var stats = rankedCh[champ].stats;
    var champWins = stats.totalSessionsWon;
    var champLoses = stats.totalSessionsLost;

    cHtml+=  '<div class="col-md-12" data-rcname="'+name+'">';
    cHtml+=   '<div class="ranked-champ">';
    cHtml+=    '<img src="'+thumb+'">';
    cHtml+=    '<a href="/champions/'+name.toLowerCase()+'" class="name">'+name+'</a>';
    cHtml+=    '<a href="#" class="more-info">more info <i class="fa fa-angle-down"></i></a>';
    cHtml+=    '<div class="win-loss">';
    cHtml+=     '<span class="win">'+champWins+'</span> - ';
    cHtml+=     '<span class="loss">'+champLoses+'</span>';
    cHtml+=    '</div>';
    // .extra-data goes here
    cHtml+=    '<div class="extra-data">';
    cHtml+=     '<table class="table">';
    cHtml+=      '<tr><th>total wins</th><td>'+stats.totalSessionsWon+'</td></tr>';
    cHtml+=      '<tr><th>total loses</th><td>'+stats.totalSessionsLost+'</td></tr>';
    cHtml+=      '<tr><th>total minion kills</th><td>'+stats.totalMinionKills+'</td></tr>';
    cHtml+=      '<tr><th>total double kills</th><td>'+stats.totalDoubleKills+'</td></tr>';
    cHtml+=      '<tr><th>total first blood</th><td>'+stats.totalFirstBlood+'</td></tr>';
    cHtml+=      '<tr><th>total damage dealt</th><td>'+stats.totalDamageDealt+'</td></tr>';
    cHtml+=      '<tr><th>total damage taken</th><td>'+stats.totalDamageTaken+'</td></tr>';
    cHtml+=      '<tr><th>total champ kills</th><td>'+stats.totalChampionKills+'</td></tr>';
    cHtml+=      '<tr><th>total champ deaths</th><td>'+stats.totalDeathsPerSession+'</td></tr>';
    cHtml+=      '<tr><th>max kills</th><td>'+stats.maxChampionsKilled+'</td></tr>';
    cHtml+=      '<tr><th>max deaths</th><td>'+stats.maxNumDeaths+'</td></tr>';
    cHtml+=     '</table>';
    cHtml+=    '</div>';
    cHtml+=   '</div>';
    cHtml+=  '</div>';
    html+=cHtml;
  }

  html+= '</div>'
  html+='</div>'


  self.sumListArea.append(html);
  $('.extra-data').hide();
  $('#summoners-page .fluid-container').append(self.sumListArea);
  this.searchRankedChamp();

}

// needs to be called from summoners.appendHTML()
// because if not, cant find #r-c-f
summoners.searchRankedChamp = function() {
  var rcf = $('#ranked-champ-filter');
  var champpa = $('.ranked-champ').parent();

  rcf.on('keyup click input', function() {
    if (this.value.length > 0) {
      champpa.hide().filter(function() {
        return $(this).data('rcname').toLowerCase().lastIndexOf(rcf.val().toLowerCase(), 0) != -1;
      }).show();
    }
    else {
      champpa.show();
    }
  });

  this.rankedChampMoreInfo();
}

summoners.rankedChampMoreInfo = function() {
  var moreInfo = $('.more-info');
  moreInfo.bind('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var extraData = $this.siblings('.extra-data');
    extraData.slideToggle();
  });
}