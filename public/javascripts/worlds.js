
var worlds = worlds || {};
worlds.teams = [
  // NA
  { name: 'Cloud 9', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/cloud9-fld3b885.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'B' },
  { name: 'Counter Logic Gaming', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/counter-logic-gaming-btmdh64w.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'A' },
  { name: 'Team Solo Mid', region: 'NA', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/team-solomid-er9lau58.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'D' },
  // EU
  { name: 'Fanatik', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/fnatic-12n9nobj.png&resize=100:100', record: { wins: '', loses: '' }, seed: 1, group: 'B' },
  { name: 'H2K', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/h2k-809eyzf8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'C' },
  { name: 'Origen', region: 'EU', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/origen-2wse5ns8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'D' },
  // LMS
  { name: 'ahq e-Sports Club', region: 'LMS', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/ahq-e-sports-club-psgajhm.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'B' },
  { name: 'Yoe Flash Wolves', region: 'LMS', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/flash-wolves-3jsj2wjv.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'A' },

  // LCK
  { name: 'KOO Tigers', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/koo-tigers-aue0bwue.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'A' },
  { name: 'KT Rolster', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/kt-rolster-6572jk8v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'D' },
  { name: 'SKTelecom T1', region: 'LCK', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/sktelecom-t1-buysspeu.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'C' },
  // LPL
  { name: 'Edward Gaming', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/edward-gaming-9nc34yn8.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 1, group: 'C' },
  { name: 'Invictus Gaming', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/invictus-gaming-33dmaihh.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 2, group: 'B' },
  { name: 'LGD Gaming', region: 'LPL', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/lgd-gaming-72sm459v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 3, group: 'D' },
  // WLD
  { name: 'Bangkok Titans', region: 'WLD', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/bangkok-titans-597g0x1v.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 0, group: 'C' },
  { name: 'Pain Gaming', region: 'WLD', logo: 'http://am.leagueoflegends.com/image/?f=http://assets.lolesports.com/team/pain-gaming-2wk5hx3u.png&resize=100:100', record: { wins: 0, loses: 0 }, seed: 0, group: 'A' }
];

console.log(worlds.teams);