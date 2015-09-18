$(function() {

  // add .active depending on /pathname
  if (window.location.pathname == '/champions') {
    $('.navbar-nav li').first().addClass('active'); }
  if (window.location.pathname == '/summoners')
    { $('.navbar-nav li').last().addClass('active'); }

  champs.champTips();
  champs.showBattleData();
  champs.searchChampion();
  champs.spellHover();
  champs.showTenCounters();
  champs.vote();

  summoners.submitSummoner();
});