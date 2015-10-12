var router       = require('express').Router();
var Champion     = require('../db/schema/champion');
var staticChamps = require('../static_champs.json');
var fs           = require('fs');
var _            = require('underscore');


router.get('/streamers', function(req, res) {
  res.render('streamers');
});

router.get('/streamers/:strname', function(req, res) {
  var path = req.params.strname;
  var chat = '//www.twitch.tv/'+path+'/chat';
  var video = '//www.twitch.tv/'+path+'/embed';
  res.render('streamer', { name: path, video: video, chat: chat });
});


router.get('/champions', function(req, res) {
  Champion
    .find()
    .sort('slug')
    .exec(function(err, champs) {
      if (err) console.log(err);
      res.render('champions', { champs: champs });
    });
});

router.get('/champions/:slug', function(req, res) {
  Champion
    .findOne({ slug: req.params.slug })
    .exec(function(err, champ) {
      if(err) console.log(err);
      res.render('champion', { champ: champ });
    });
});

router.post('/upvote', function(req, res) {
  var rb = req.body;
  var cond = { name: rb.lc };
  var upda;

  // since counter{ga/ba} different properties, need cond
  // to get correct cond & upda objects for increment
  if (rb.gorb === 'bad') {
    cond['counter.badAgainst.counterName'] = rb.c;
    upda = { $inc: { 'counter.badAgainst.$.upvotes': 1 } };
  }
  else if (rb.gorb === 'good') {
    cond['counter.goodAgainst.counters'] = rb.c;
    upda = { $inc: { 'counter.goodAgainst.$.upvotes': 1 } };
  }

  Champion.update(cond, upda, function(err, champ) {
    if (err) console.log(err);
    console.log(champ);
  })
});

router.post('/downvote', function(req, res) {
  var rb = req.body;
  var cond = { name: rb.lc };
  var upda;

  if (rb.gorb === 'bad') {
    cond['counter.badAgainst.counterName'] = rb.c;
    upda = { $inc: { 'counter.badAgainst.$.downvotes': 1 } };
  }
  else if (rb.gorb === 'good') {
    cond['counter.goodAgainst.counters'] = rb.c;
    upda = { $inc: { 'counter.goodAgainst.$.downvotes': 1 } };
  }

  Champion.update(cond, upda, function(err, champ) {
    if (err) console.log(err);
    console.log(champ);
  });
});

router.get('/summoners', function(req, res) {
  res.render('summoners');
});

router.get('/blah', function(req, res) {
  res.render('blah');
});

router.get('/hihi', function(req, res) {
  res.json({hello: 'there123', bye: 'from123'});
});

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
