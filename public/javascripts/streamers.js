var streamers = streamers || {};
streamers.topStreamers = [];


var getStreamers = function(options, callback) {
  var limit = options.limit || 100;
  var url = 'https://api.twitch.tv/kraken/search/streams\?q\=League+Of+Legends\&limit\='+limit;

  $.ajax({ url: url, type: 'GET' })
    .success(function(data) { callback(null, data); })
    .fail(function(x, s, e) { callback(e, null); })

}


streamers.init = function() {
  getStreamers({}, function(err, data) {
    $.each(data.streams, function(i, str) {
      streamers.topStreamers.push(str);
    });
    streamers.appendTop20();
  });
}


streamers.appendTop20 = function() {
  var twon = streamers.topStreamers.slice(0, 20);


}


