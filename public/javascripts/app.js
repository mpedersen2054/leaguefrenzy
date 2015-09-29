$(function() {

  var path = window.location.pathname;

  // add .active depending on /pathname
  if (path == '/champions') { $('.navbar-nav li').first().addClass('active'); }
  if (path == '/summoners') { $('.navbar-nav li').last().addClass('active'); }


  streamers.getTopStreamers();

  champs.champTips();
  champs.showBattleData();
  champs.searchChampion();
  champs.spellHover();
  champs.showTenCounters();
  champs.vote();

  summoners.submitSummoner();

});