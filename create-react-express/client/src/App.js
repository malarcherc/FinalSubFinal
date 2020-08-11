import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/Clock"
import "./components/MainBody"
import MainBody from "./components/MainBody";
import Clock from "./components/Clock";
import CardContainer from "./components/CardPres"
import ClickityClick from './components/ClickityClick';
import Decklist from "./components/Decklist"
import DecklistWrapper from "./components/DecklistWrapper";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from './components/Home';
import Admin from './components/Admin';
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";


import Login from "./pages/Login";
import Signup from './pages/Signup';
import SiteNavBar from "./components/SiteNavBar";
import TopDecks from "./components/TopDecks"


function App(props) {
  return (
    <AuthContext.Provider value={false}>
    <Router>
    <div>
      <ul>
        <SiteNavBar></SiteNavBar>
      </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/topdecks" component={TopDecks} />
          <PrivateRoute path="/admin" component={Admin} />
    </div>
  </Router>
  </AuthContext.Provider>
  );
}


export default App;
