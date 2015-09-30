
var worlds = worlds || {};
worlds.allGroups = [];
worlds.groupa = ['a']; worlds.groupb = ['b'];
worlds.groupc = ['c']; worlds.groupd = ['d'];
worlds.teams = [
  // NA
  { name: 'Cloud 9', acro: 'C9', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/cloud9-fld3b885.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'B' },
  { name: 'Counter Logic Gaming', acro: 'CLG', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/counter-logic-gaming-btmdh64w.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'A' },
  { name: 'Team Solo Mid', acro: 'TSM', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/team-solomid-er9lau58.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'D' },
  // EU
  { name: 'Fanatik', acro: 'FNC', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/fnatic-12n9nobj.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'B' },
  { name: 'H2K', acro: 'H2K', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/h2k-809eyzf8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'C' },
  { name: 'Origen', acro: 'OG', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/origen-2wse5ns8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'D' },
  // LMS
  { name: 'ahq e-Sports Club', acro: 'ahq', region: 'LMS', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/ahq-e-sports-club-psgajhm.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'B' },
  { name: 'Yoe Flash Wolves', acro: 'Yoe', region: 'LMS', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/flash-wolves-3jsj2wjv.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'A' },
  // LCK
  { name: 'KOO Tigers', acro: 'KOO', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/koo-tigers-aue0bwue.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'A' },
  { name: 'KT Rolster', acro: 'KT', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/kt-rolster-6572jk8v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'D' },
  { name: 'SKTelecom T1', acro: 'SKT', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/sktelecom-t1-buysspeu.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'C' },
  // LPL
  { name: 'Edward Gaming', acro: 'EDG', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/edward-gaming-9nc34yn8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'C' },
  { name: 'Invictus Gaming', acro: 'INV', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/invictus-gaming-33dmaihh.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'B' },
  { name: 'LGD Gaming', acro: 'LGD', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/lgd-gaming-72sm459v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'D' },
  // WLD
  { name: 'Bangkok Titans', acro: 'BKT', region: 'WLD', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/bangkok-titans-597g0x1v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 0, group: 'C' },
  { name: 'Pain Gaming', acro: 'PG', region: 'WLD', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/pain-gaming-2wk5hx3u.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 0, group: 'A' }
];


worlds.init = function() {
  // set groups
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

  worlds.appendHTML();
}


worlds.appendHTML = function() {
  var groups = $('.groups');
  var mainHtml = '';

  for (var i in worlds.allGroups) {
    var grp = worlds.allGroups[i];
    var grpname = grp.shift()

    console.log(grpname)
    console.log(grp)
    var h = '';

    h+='<div class="group">';
    h+='<h4>Group '+grpname+'</h4>';
    h+='<div class="row">';
    // each team in grp
    for (var i in grp) {
      var team = grp[i];
      var html = '';

      html+='<div class="col-md-3">';
      html+='<a href="#" class="team">';
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

  console.log(mainHtml)
  groups.append(mainHtml);

}
