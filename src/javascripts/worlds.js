
var worlds = worlds || {};
worlds.allGroups = [];
worlds.currentTab = 'group';

// for group stage
// first element of each array is the group letter
// group : [ 'a', { ... }, { ... }, { ... }, { ... } ]
worlds.groupa = ['a']; worlds.groupb = ['b'];
worlds.groupc = ['c']; worlds.groupd = ['d'];

worlds.teams = [
  // NA
  { name: 'Cloud 9', acro: 'C9', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/cloud9-fld3b885.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'B', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/cloud9' },
  { name: 'Counter Logic Gaming', acro: 'CLG', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/counter-logic-gaming-btmdh64w.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'A', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/counter-logic-gaming' },
  { name: 'Team Solo Mid', acro: 'TSM', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/team-solomid-er9lau58.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'D', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/team-solomid' },
  // EU
  { name: 'Fnatic', acro: 'FNC', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/fnatic-12n9nobj.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'B', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/fnatic' },
  { name: 'H2K', acro: 'H2K', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/h2k-809eyzf8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'C', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/h2k' },
  { name: 'Origen', acro: 'OG', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/origen-2wse5ns8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'D', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/origen' },
  // LMS
  { name: 'ahq e-Sports Club', acro: 'AHQ', region: 'LMS', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/ahq-e-sports-club-psgajhm.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'B', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/ahq-e-sports-club' },
  { name: 'Yoe Flash Wolves', acro: 'YOE', region: 'LMS', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/flash-wolves-3jsj2wjv.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'A', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/flash-wolves' },
  // LCK
  { name: 'KOO Tigers', acro: 'KOO', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/koo-tigers-aue0bwue.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'A', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/koo-tigers' },
  { name: 'KT Rolster', acro: 'KT', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/kt-rolster-6572jk8v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'D', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/kt-rolster' },
  { name: 'SKTelecom T1', acro: 'SKT', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/sktelecom-t1-buysspeu.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'C', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/sktelecom-t1' },
  // LPL
  { name: 'Edward Gaming', acro: 'EDG', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/edward-gaming-9nc34yn8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'C', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/edward-gaming' },
  { name: 'Invictus Gaming', acro: 'INV', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/invictus-gaming-33dmaihh.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'B', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/invictus-gaming' },
  { name: 'LGD Gaming', acro: 'LGD', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/lgd-gaming-72sm459v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'D', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/lgd-gaming' },
  // WLD
  { name: 'Bangkok Titans', acro: 'BKT', region: 'WLD', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/bangkok-titans-597g0x1v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 0, group: 'C', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/bangkok-titans' },
  { name: 'Pain Gaming', acro: 'PG', region: 'WLD', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/pain-gaming-2wk5hx3u.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 0, group: 'A', infourl: 'http://worlds.lolesports.com/en_US/worlds/teams/pain-gaming' }
];

// for knockout stage

// add teams to KO stage & clone & add properties
// seeds : 1 vs 8, 4 vs 5, 2 vs 7, 3 vs 6

worlds.ko = {
  qfinal: [],
  sfinal: [],
  gfinal: [],
  init: function() {
    this.addTeamToKnockout('YOE', 1);
    this.addTeamToKnockout('FNC', 2);
    this.addTeamToKnockout('KT' , 3);
    this.addTeamToKnockout('SKT', 4);
    this.addTeamToKnockout('AHQ', 5);
    this.addTeamToKnockout('KOO', 6);
    this.addTeamToKnockout('EDG', 7);
    this.addTeamToKnockout('OG' , 8);
  },

  addTeamToKnockout: function(acro, seed) {
    var self = this;
    var team = _.clone(worlds.teams[_.findIndex(worlds.teams, { acro: acro })]);
    team.koseed = seed;
    team.knockoutStage = {
      record: { w: 0, l: 0 },
      qfinal:true ,
      sfinal:false,
      gfinal:false
    };
    self.qfinal.push(team);
  },

  playGame: function(t1seed, t2seed, outcome, victorid, nextStage, thisStage) {
    // tXs is team1 seed & team2 seed
    // outcome = { x: 3, y: 1 };
    var self = this;
    var team1 = self.qfinal[_.findIndex(self.qfinal, { koseed: t1seed })];
    var team2 = self.qfinal[_.findIndex(self.qfinal, { koseed: t2seed })];

    if (victorid === t1seed) {
      team1.knockoutStage.record.w += outcome.w;
      team1.knockoutStage.record.l += outcome.l;
      team2.knockoutStage.record.w += outcome.l;
      team2.knockoutStage.record.l += outcome.w;
      // team1.knockoutStage[nextStage] = true;
      team1.knockoutStage[thisStage] = { w: outcome.w, l: outcome.l }
      worlds.ko[nextStage].push(team1);
    }
    else if (victorid === t2seed) {
      team2.knockoutStage.record.w += outcome.w;
      team2.knockoutStage.record.l += outcome.l;
      team1.knockoutStage.record.w += outcome.l;
      team1.knockoutStage.record.l += outcome.w;
      // team2.knockoutStage[nextStage] = true;
      team2.knockoutStage[thisStage] = { w: outcome.w, l: outcome.l }

      self[nextStage].push(team2);
    }
    else {
      console.log('something went wrong');
    }
  },

  playQFinal: function() {
    var self = this;
    self.playGame(1, 8, { w: 3, l: 1 }, 8, 'sfinal', 'qfinal');
    self.playGame(4, 5, { w: 3, l: 0 }, 4, 'sfinal', 'qfinal');
    self.playGame(2, 7, { w: 3, l: 0 }, 2, 'sfinal', 'qfinal');
    self.playGame(3, 6, { w: 3, l: 1 }, 6, 'sfinal', 'qfinal');
  },

  playSFinal: function() {
    var self = this;
    self.playGame(8, 4, { w: 3, l: 0 }, 4, 'gfinal', 'sfinal');
    self.playGame(2, 6, { w: 3, l: 0 }, 6, 'gfinal', 'sfinal');
  },

  playGFinal: function() {
    console.log('hello playGFinal...')
  }

};


// SEMIFINALS ( implement sat/sun )
// worlds.ko.sfinal = sfinal;
// playGame(1, 8, { w: 3, l: 1 }, 8, 'sfinal');
// playGame(1, 8, { w: 3, l: 1 }, 8, 'sfinal');


// set groups and call appendHTML
worlds.init = function() {

  for (var i in worlds.teams) {
    var team = worlds.teams[i];
    if (team.group == 'A') { worlds.groupa.push(team); }
    if (team.group == 'B') { worlds.groupb.push(team); }
    if (team.group == 'C') { worlds.groupc.push(team); }
    if (team.group == 'D') { worlds.groupd.push(team); }
  }

  worlds.allGroups.push(worlds.groupa);
  worlds.allGroups.push(worlds.groupb);
  worlds.allGroups.push(worlds.groupc);
  worlds.allGroups.push(worlds.groupd);

  // show groupstage initially
  $('.groups').show();

  worlds.ko.init();
  worlds.setTabsClickEv();
  worlds.appendKOStageHTML();
  worlds.appendGroupStageHTML();
}


worlds.setTabsClickEv = function() {
  var tabs = $('.tabs a');

  tabs.on('click', function(e) {
    e.preventDefault();
    var tabName = $(this).data('tab');

    $(this).addClass('active');

    if (tabName === 'groups' && worlds.currentTab != tabName) {
      worlds.currentTab = tabName;
      $('.knockout-stg').removeClass('active');
      $('.knockouts').hide();
      $('.groups').show();
    }
    else if (tabName === 'knockouts' && worlds.currentTab != tabName) {
      worlds.currentTab = tabName;
      console.log('ko\'s clicked!');
      $('.group-stg').removeClass('active');
      $('.groups').hide();
      $('.knockouts').show();
    }
    else {
      console.log('already on that tab!');
      return;
    }

  });
}


worlds.appendKOStageHTML = function() {
  var kos = $('.knockouts');

  appendQFinal();
  appendSFinal();
  appendGFinal();

  function appendQFinal() {
    var m1=[], m2=[], m3=[], m4=[], w=worlds.ko.qfinal;
    var qfinals = [];
    var h = '';

    // adds w/l for all teams and sfinal:true
    worlds.ko.playQFinal();

    // push teams into correct matches
    // then all into qfinals[]
    // [ [], [], [], [] ]
    m1.push(w[0], w[7]);
    m2.push(w[3], w[4]);
    m3.push(w[1], w[6]);
    m4.push(w[2], w[5]);
    qfinals.push(m1, m2, m3, m4);

    h+='<div class="quarter-finals final">'
    h+='<h3>Quarter Finals</h3>'
    h+='<div class="row">'


    // take each match in qfinals
    for (var i in qfinals) {
      var match = qfinals[i];
      var t1 = match[0], t2 = match[1];
      var winner;
      var t1wins = t1.knockoutStage.record.w;
      var t2wins = t2.knockoutStage.record.w;
      winner = (t1wins > t2wins) ? t1 : t2;
      var winnerwins = winner.knockoutStage.record.w;
      var winnerloses = winner.knockoutStage.record.l;
      var html = '';

      html+='<div class="col-lg-3 col-sm-6 col-xs-6">'
      html+='<div class="match">'
      html+='<div class="team">'
      html+='<div class="icon">'
      html+='<img src="'+t1.logo+'" alt="">'
      html+='</div>'
      html+='<div class="name">'+t1.acro+'</div>'
      html+='</div>'
      html+='<div class="versus">VS</div>'
      html+='<div class="team">'
      html+='<div class="icon">'
      html+='<img src="'+t2.logo+'" alt="">'
      html+='</div>'
      html+='<div class="name">'+t2.acro+'</div>'
      html+='</div>'



      html+='<div class="winner">'
      html+='W: <span class="wteam">'+winner.acro+'</span>'
      html+='<div class="vicdef">'
      html+='<span class="w">'+winnerwins+'</span> - <span class="l">'+winnerloses+'</span>'
      html+='</div>'
      html+='</div>'

      html+='</div>'
      html+='</div>'

      h+=html;
    }

    h+='</div>'
    h+='</div>'

    kos.prepend(h);
  }

  function appendSFinal() {
    var sfinals = [];
    var m1=[], m2=[];
    var h = '';

    worlds.ko.playSFinal();

    m1.push(worlds.ko.sfinal[0], worlds.ko.sfinal[1]);
    m2.push(worlds.ko.sfinal[2], worlds.ko.sfinal[3]);
    sfinals.push(m1, m2);

    console.log(sfinals);

    h+='<div class="semi-finals final">'
    h+='<h3>Semi Finals</h3>'
    h+='<div class="row">'

    h+='<div class="col-lg-3"></div>'

    for (var i in sfinals) {
      var match = sfinals[i];
      var t1 = match[0], t2 = match[1];
      var winner;
      var t1wins = t1.knockoutStage.record.w;
      var t2wins = t2.knockoutStage.record.w;
      winner = (t1wins > t2wins) ? t1 : t2;
      var winnerwins  = winner.knockoutStage.sfinal.w;
      var winnerloses = winner.knockoutStage.sfinal.l;

      var html = ''
      html+='<div class="col-lg-3 col-sm-6 col-xs-6">'
      html+='<div class="match">'
      html+='<div class="team">'
      html+='<div class="icon">'
      html+='<img src="'+t1.logo+'" alt="">'
      html+='</div>'
      html+='<div class="name">'+t1.acro+'</div>'
      html+='</div>'
      html+='<div class="versus">VS</div>'
      html+='<div class="team">'
      html+='<div class="icon">'
      html+='<img src="'+t2.logo+'" alt="">'
      html+='</div>'
      html+='<div class="name">'+t2.acro+'</div>'
      html+='</div>'

      html+='<div class="winner">'
      html+='W: <span class="wteam">'+winner.acro+'</span>'
      html+='<div class="vicdef">'
      html+='<span class="w">'+winnerwins+'</span> - <span class="l">'+winnerloses+'</span>'
      html+='</div>'
      html+='</div>'

      html+='</div>'
      html+='</div>'

      h+=html;
    }

    h+='</div>'
    h+='</div>'

    kos.find('.quarter-finals').after(h);
  }

  function appendGFinal() {
    console.log('hello appendGFinal');
    worlds.ko.playGFinal();
  }

}

worlds.appendGroupStageHTML = function() {
  var groups = $('.groups');
  var mainHtml = '';

  for (var i in worlds.allGroups) {
    var grp = worlds.allGroups[i];
    var grpname = grp.shift();
    var h = '';

    h+='<div class="group">';
    h+='<h3>Group '+grpname+'</h3>';
    h+='<div class="row">';
    // each team in grp
    for (var i in grp) {
      var team = grp[i];
      var html = '';

      html+='<div class="col-md-3 col-sm-3 col-xs-6">';
      html+='<a href="'+team.infourl+'" class="team" target="_blank">';
      html+='<div class="team-block">';
      html+='<div class="logo">';
      html+='<img src="'+team.logo+'" alt="">';
      html+='</div>';
      html+='<div class="acro">'+team.acro+'</div>';
      html+='<div class="region">'+team.region+'</div>';
      html+='<div class="record">';
      html+='<span>'+team.record.wins+'</span> - <span>'+team.record.loses+'</span>';
      html+='</div>';
      html+='</div>';
      html+='</a>';
      html+='</div>';

      h+=html;
    }
    h+='</div>';
    h+='</div>';
    mainHtml+=h;
  }
  groups.append(mainHtml);
}
