const mongoose = require('mongoose');

const DecklistSchema = new mongoose.Schema({
    author: {
      type: String,
      default: ''
    },
    deckName:{ 
      type: String,
      default:'Deck Name'
    },
    deckID: {
      type:Number,
      default: ''
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    listofCards:{
       type: Array,
       default:["Uro","Time Warp"]
      },
  });

module.exports = mongoose.model('DecklistSchema', DecklistSchema);