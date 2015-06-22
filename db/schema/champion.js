var mongoose = require('mongoose');

var ChampionSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  slug: { type: String },
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
  spells: [
    {
      name: String,
      image: String,
      registrationEnabled: Boolean,
      checkinEnabled: Boolean
    }
  ],
  counter: {
    goodAgainst: [
      {
        champName: String,
        counters: String,
        position: String,
        upvotes: String,
        downvotes: String,
        comments: [
          {
            commenter: String,
            dateAdded: Date,
            contents: String
          }
        ]
      }
    ],
    badAgainst: [
      {
        champName: String,
        counterName: String,
        position: String,
        upvotes: String,
        downvotes: String,
        comments: [
          {
            commenter: String,
            dateAdded: Date,
            contents: String
          }
        ]
      }
    ]
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