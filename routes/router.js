var router = require('express').Router();


/* GET home page. */
router.get('/champions', function(req, res) {
  res.send('hello champions page')
});

router.get('/', function(req, res) {
  res.json('what up index')
})

module.exports = router;
