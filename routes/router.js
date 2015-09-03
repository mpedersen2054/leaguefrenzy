var router = require('express').Router();
var Champion = require('../db/schema/champion');
var _ = require('underscore');


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

// router.post('/champions/:slug/good/:slug2', function(req, res, next) {
  // if (!req.session) { return console.log('no session!') }
  // console.log('whaddup session, ', req.session);
  // res.status(200).send('success!')
// });

router.post('/counter/:slug/bad/:slug2', function(req, res, next) {
  var rp = req.params;
  var sess = req.session;

  var cc = {c: rp.slug, l: rp.slug2}

  if (sess.counters) {
    var inReqVotes = _.findIndex(sess.counters, cc);
    if (inReqVotes === -1) {
      console.log('not there!')
      sess.counters.push(cc);
      res.json('success! ', sess.counters)
    }
    else {
      console.log('its there!!!')
      res.json('success! ', sess.counters)
    }
  }

});

router.get('/remove-session', function(req, res) {
  req.session.destroy(function(err) {
    if (err) console.log(err);
    res.redirect('/champions');
  })
})

router.get('/', function(req, res) {
  res.json(req.session)
})

module.exports = router;
