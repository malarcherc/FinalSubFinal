import React, { Component } from 'react';
import 'whatwg-fetch';
import Decklist from './Decklist'


import {Form, FormControl, Navbar, Nav, NavDropdown, Button, Col, Row, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import {
  getFromStorage,
  setInStorage,
} from './utils';
import UserLoginPage from './UserLoginPage';
import FavCardDisplay from './FavCardDisplay';
//import Decklist from './Decklist';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInUsername: '',
      signInEmail: '',
      signInPassword: '',
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFavoriteCard:'',
      updateFavoriteCard:'',
      updateFavoriteDeck:'',
      favoriteDeck: '',
      favoriteCard:''
    };

    this.onTextboxChangeSignInUsername = this.onTextboxChangeSignInUsername.bind(this);
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFavoriteCard = this.onTextboxChangeSignUpFavoriteCard.bind(this);

    this.onTextboxChangeUpdateFavoriteCard = this.onTextboxChangeUpdateFavoriteCard.bind(this);
    this.onTextboxChangeUpdateFavoriteDeck = this.onTextboxChangeUpdateFavoriteDeck.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.updateDeck = this.updateDeck.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInUsername(event) {
    this.setState({
      signInUsername: event.target.value,
    });
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpUsername(event) {
    this.setState({
      signUpUsername: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangeSignUpFavoriteCard(event) {
    this.setState({
      signUpFavoriteCard: event.target.value,
    });
  }
  onTextboxChangeUpdateFavoriteCard(event) {
    this.setState({
      updateFavoriteCard: event.target.value,
    });
  }

  onTextboxChangeUpdateFavoriteDeck(event) {
    this.setState({
      updateFavoriteDeck: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpUsername,
      signUpEmail,
      signUpPassword,
      signUpFavoriteCard
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
        favoriteCard: signUpFavoriteCard
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInUsername,
      signInEmail,
      signInPassword,

    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInUsername,
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            favoriteCard: json.favoriteCard,
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
    console.log(token);
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  updateCard(){
    const {
      signInUsername,
      signInEmail,
      updateFavoriteCard

    } = this.state;

    this.setState({
      isLoading: true,
    });

    console.log(signInUsername);
    console.log(signInEmail);

    fetch('/api/account/updatecard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInUsername,
        email: signInEmail,
        favoriteCard: updateFavoriteCard,
      }),
    })
    .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            isLoading: false,
            favoriteCard: json.favoriteCard,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  //update deck
  updateDeck(){
    const {
      signInUsername,
      signInEmail,
      updateFavoriteDeck
  
    } = this.state;

    this.setState({
      isLoading: true,
    });

    console.log(signInUsername);
    console.log(signInEmail);

    fetch('/api/account/updatedeck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInUsername,
        email: signInEmail,
        favoriteDeck: updateFavoriteDeck,
      }),
    })
    .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            isLoading: false,
            favoriteDeck: json.favoriteDeck,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }


  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInEmail,
      signInPassword,
      signUpUsername,
      signUpEmail,
      signUpPassword,
      signUpError,
      signUpFavoriteCard,
      updateFavoriteCard,
      updateFavoriteDeck
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
            <Container>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <br></br>
            <Button onClick={this.onSignIn}>Sign In</Button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input
              type="username"
              placeholder="Username"
              value={signUpUsername}
              onChange={this.onTextboxChangeSignUpUsername}
            /><br />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <br></br>
            <input
              type="text"
              placeholder="Favorite Card"
              value={signUpFavoriteCard}
              onChange={this.onTextboxChangeSignUpFavoriteCard}
            /><br />
            <Button onClick={this.onSignUp}>Sign Up</Button>
          </div>
          </Container>
        </div>
      );
    }



    return (
      <div>
        <Container>
        <input
              type="text"
              placeholder="New Card"
              value={updateFavoriteCard}
              onChange={this.onTextboxChangeUpdateFavoriteCard}
            /><br />
    <p>Your favorite card is {this.state.favoriteCard}</p>
  

    <input
              type="text"
              placeholder="Update Deck"
              value={updateFavoriteDeck}
              onChange={this.onTextboxChangeUpdateFavoriteDeck}
            /><br />
    <p>Your favorite Deck is {this.state.favoriteDeck}</p>

    

    <button onClick={this.updateCard}>update card </button>

    <button onClick={this.updateDeck}>update Decklist</button>
      
        <button onClick={this.logout}>Logout </button>
        <FavCardDisplay listofCards={[[1, this.state.favoriteCard]]}></FavCardDisplay>
        </Container>
      </div>
      
    );
  }
}

export default Home;
