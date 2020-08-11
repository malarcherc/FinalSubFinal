const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const DecklistSchema = require('../../models/DecklistSchema');

module.exports = (app) => {
  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
     } = body;
     let {
      username
     } = body;
     let {
      favoriteCard
     } = body;

     console.log(body);
    
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.favoriteCard = favoriteCard;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error 3'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });
  }); 


  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      
      const user = users[0];
      //console.log(users[0]);

      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }


    
      // Otherwise correct user

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.username = user.username;
      userSession.favoriteCard = user.favoriteCard;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
          username:doc.username,
          favoriteCard: doc.favoriteCard
          
        });
      });
    });
  });


  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

  app.get('/api/account/user', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });
  //Decklist
  app.get('/api/account/usernname', (req, res, next) => {

    console.log(req.body.email);

    return res.send({
      success: true,
      message: 'Good'
     
    });

  })
  app.post('/api/account/username', (req, res, next) => {

    console.log(req.body.email);

    return res.send({
      success: true,
      message: 'Good'
     
    });

  })

  app.post('/api/account/updatecard', (req, res, next) => {
    const { body } = req; 
  
    let {
      email
    } = body;
    let {
      favoriteCard
    } = body

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const user = users[0];

      console.log(users[0]);

      user.favoriteCard = favoriteCard;
      user.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
          username:doc.username,
          favoriteCard: doc.favoriteCard
          
        });
      });

      // Otherwise correct user
     

    });



    console.log(req.body.favoriteCard);
  })


  ///////////////
  app.post('/api/account/updatedeck', (req, res, next) => {
    const { body } = req; 
    let {
      email
    } = body;
    let {
      favoriteDeck
    } = body

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const user = users[0];

      console.log(users[0]);

      user.favoriteDeck = favoriteDeck;
      user.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
          username:doc.username,
          favoriteDeck: doc.favoriteDeck
          
        });
      });

      // Otherwise correct user
     

    });



    console.log(req.body.favoriteCard);
  })


  /////////get info
  app.get('/api/account/deck', (req, res, next) => {
    const { body } = req; 
    let {
      email
    } = body;

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const user = users[0];

    

     
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: user._id,
          username:user.username,
          favoriteDeck: user.favoriteDeck,
          favoriteCard: user.favoriteCard
          
       
      });

      // Otherwise correct user
     

    });



    ///
    
  })




};

