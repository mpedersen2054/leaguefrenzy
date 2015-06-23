var router = require('express').Router();
var Champion = require('../db/schema/champion');


router.get('/champions', function(req, res) {
  Champion
    .find()
    .sort('slug')
    .exec(function(err, champs) {
      res.render('champions', { champs: champs });
    });
});

router.get('/champions/:slug', function(req, res) {
  Champion
    .findOne({ slug: req.params.slug })
    .exec(function(err, champ) {
      if(err) console.log(err);
      console.log(champ)
      res.render('champion', { champ: champ });
    });
});

router.get('/', function(req, res) {
  res.json('what up index')
})

module.exports = router;
