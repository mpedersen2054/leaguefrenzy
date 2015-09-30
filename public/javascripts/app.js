$(function() {

  var path = window.location.pathname.split('/')[1];

  // add .active depending on /pathname
  if (path == 'champions') { $('.navbar-nav li').first().addClass('active'); }
  if (path == 'summoners') { $('.navbar-nav li').last().addClass('active'); }


  if (path == '')          { streamers.init('part'); worlds.init(); }
  if (path == 'streamers') { streamers.init('all'); }
  if (path == 'champions') { champs.init(); }
  if (path == 'summoners') { summoners.submitSummoner(); }

});