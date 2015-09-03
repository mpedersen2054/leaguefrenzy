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


router.post('/counter', function(req, res, next) {
  var rb = req.body;

  console.log(rb);
  return res.status(200).send(rb);
});

router.get('/', function(req, res) {
  res.send('hello index')
})

module.exports = router;
