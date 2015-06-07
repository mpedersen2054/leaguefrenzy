var router = require('express').Router();
var Champion = require('../db/schema/champion');


router.get('/champions', function(req, res) {
  Champion
    .find()
    .sort('name')
    .exec(function(err, champs) {
      res.render('champions', { champs: champs });
    });
});

router.get('/champions/:id', function(req, res) {
  Champion
    .findOne({ _id: req.params.id })
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
