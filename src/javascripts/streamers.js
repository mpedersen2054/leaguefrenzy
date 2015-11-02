var streamers = streamers || {};
streamers.topStreamers = [];

var strHeader = $('.stream-header');
var tblResp = $('#streamers-page .table-responsive');

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
    .css({ 'font-size': '2em', 'position': 'relative', 'left': '43%', 'color': '#777', 'margin-top': '2em' });

  // add spinner to either header of Twenty, or after .table-responsive of All Streamers
  strHeader.after(spinner);
  tblResp.after(spinner);

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

  for (var i in fift) {
    var streamer = fift[i];
    if (!streamer) return;
    var channelUrl = streamer.channel.url.split('/').pop();
    var h = '';

    h+='<a href="/streamers/'+channelUrl+'" class="stream" alt="'+streamer.channel.status+'">';
    h+='<div class="stream-block clearfix">';
    h+='<div class="title">'+streamer.channel.status+'</div>';
    h+='<div class="views">'+streamer.viewers+'</div>';
    h+='</div>';
    h+='</a>';

    html+=h;
  }

  html+='<a href="/streamers" class="btn btn-xs btn-success more-streamers">more</a>';
  $('.spinner').detach();
  strHeader.after(html);
}



streamers.appendAll = function() {
  var allStreamers = $('.all-streamers');
  var h = '';

  var spinner = $('<i></i>');
  spinner
    .addClass('fa fa-circle-o-notch fa-spin spinner')
    .css({ 'font-size': '2em', 'position': 'relative', 'left': '50%', 'color': '#444', 'margin-top': '2em' })
    .show()

  function getHTML(callback) {

    for (var i in streamers.topStreamers) {
      var streamer = streamers.topStreamers[i];
      var html = '';
      var date = new Date(streamer.channel.created_at);
      var channelUrl = streamer.channel.url.split('/').pop();

      html+='<tr>'
      html+='<td class="stream-name"><a href="streamers/'+channelUrl+'">'+streamer.channel.status+'</a></td>'
      html+='<td class="streamer-name">'+streamer.channel.display_name+'</td>'
      html+='<td class="viewers">'+streamer.viewers+'</td>'
      html+='</tr>'

      h+=html;
    }

    callback(h);
  }

  getHTML(function(html) {
    $('.spinner').detach();
    allStreamers.append(html).show();
  })

}

