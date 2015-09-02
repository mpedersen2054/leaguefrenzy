
var redisUrl = require('redis-url').connect()

module.exports = function Sessions(url, secret) {
  var store = new RedisStore({ url: url });
  var session = expressSession({
    secret: secret,
    store: store,
    resave: true,
    saveUninitialized: true
  });

  return session;
};