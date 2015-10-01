var streamers = streamers || {};
streamers.topStreamers = [];

var strHeader = $('.stream-header');

var getStreamers = function(options, callback) {
  var limit = options.limit || 100;
  var url = 'https://api.twitch.tv/kraken/search/streams\?q\=League+Of+Legends\&limit\='+limit;

  $.ajax({ url: url, type: 'GET' })
    .success(function(data) { callback(null, data); })
    .fail(function(x, s, e) { callback(e, null); })
}


streamers.init = function(path) {

  // add spinner where streamers will go
  var spinner = $('<i></i>');
  spinner
    .addClass('fa fa-circle-o-notch fa-spin spinner')
    .css({ 'font-size': '2em', 'position': 'relative', 'left': '43%', 'color': '#777', 'margin-top': '2em' })
  strHeader.after(spinner);

  // get all streamers, route to either top15 or all
  getStreamers({}, function(err, data) {
    $.each(data.streams, function(i, str) {
      streamers.topStreamers.push(str);
    });

    if (path == 'part') { streamers.appendTop15(); }
    if (path == 'all')  { streamers.appendAll(); }

  });
}


streamers.appendTop15 = function() {
  var fift = streamers.topStreamers.slice(0, 15);
  var html = '';

  console.log(fift)

  for (var i in fift) {
    var streamer = fift[i];
    var channelUrl = streamer.channel.url.split('/').pop();
    var h = '';

    h+='<a href="/streamers/'+channelUrl+'" class="stream" alt="'+streamer.channel.name+'">';
    h+='<div class="stream-block clearfix">';
    h+='<div class="title">'+streamer.channel.status+'</div>';
    h+='<div class="views">'+streamer.viewers+'</div>';
    h+='</div>';
    h+='</a>';

    html+=h;
  }

  html+='<a href="/streamers" class="btn btn-xs btn-success more-streamers">more</a>';
  $('.spinner').detach();
  $('.stream-header').after(html);
}


