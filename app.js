var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var request         = require('request');
var hbs             = require('hbs');
var scrapeChampInfo = require('./lib/scrapeChampInfo');
var mongoose        = require('mongoose');

var dburl = process.env.MONGOLAB_URI || 'mongodb://localhost/leaguefrenzy';
mongoose.connect(dburl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('~~ connected to mongodb ~~') });

scrapeChampInfo();

var app = express();

app.use(logger('tiny'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

// app.use(function(req, res, next) {
//   next();
// });

var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 8080);
