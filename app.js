var express      = require('express');
var redis        = require('redis');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser')
var request      = require('request');
var hbs          = require('hbs');
var hello        = require('./lib/hello');
var mongoose     = require('mongoose');
var http         = require('http');

var session      = require('express-session');
var redisStore   = require('connect-redis')(session);


mongoose.connect('mongodb://localhost/leaguefrenzy');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('~~ connected to mongodb ~~') });


hello.populateChamps();


var client = redis.createClient();
var app = express();

app.use(session(
  {
    secret: 'yourothersecretcode',
    store: new redisStore({ host: 'localhost', port: 6379, client: client }),
    saveUninitialized: true, // don't create session until something stored,
    resave: true // don't save session if unmodified
  }
));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');
app.use(logger('tiny'));
app.use(cookieParser('mysecret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  req.app.locals.counters =  [];
  console.log(req.app.locals.counters)
  next();
})


var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8080)
