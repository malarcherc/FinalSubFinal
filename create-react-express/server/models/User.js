const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    default: ''
  },
  commentText:{ 
    type: String,
    default:'SampleComment'
  },
  commentID: {
    type:Number,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
});

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

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },

  favoriteCard:{type:String, default:"Black Lotus"},
  favoriteDeck:{type:String, default:"Black Lotus"},

  decklists:[DecklistSchema],
  username:{
    type:String,
    default: 'username'
  }
});
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);