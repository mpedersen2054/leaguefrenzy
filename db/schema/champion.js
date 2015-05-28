var mongoose = require('mongoose');

var ChampionSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  image: {
    thumbnail: { type: String },
    splash: { type: String }
  },
  allyTips: [ { type: String } ],
  enemyTips: [ { type: String } ],
  tags: [ { type: String } ],
  info: {
    attack: Number,
    defense: Number,
    magic: Number,
    difficulty: Number
  },
  spells: {
    name: { type: String, default: 'none' },
    image: { type: String, default: 'none' },
  }

});

// name
// title
// image {thumbnail, splash}
// allyTips []
// enemyTips []
// tags []
// info {attack, defense, magic, difficulty}
// spells

module.exports = mongoose.model('Champion', ChampionSchema);