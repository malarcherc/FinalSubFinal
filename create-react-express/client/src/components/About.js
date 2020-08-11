import React from 'react';

import './decklist.css';
import 'bootstrap/dist/css/bootstrap.css';

import { CSVLink, CSVDownload } from "react-csv";
import { card } from 'mtgsdk';
import CardButton from './CardButton';
import CardPres from "./CardPres";
import {Form, FormControl, Navbar, Nav, NavDropdown, Button, Col, Row, Container} from 'react-bootstrap';



const mtg = require("mtgsdk")



class About extends React.Component {
  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      hasBeenClicked: false,
      activeCard:null,
      activeImageUrl:null,
      deckName: "Monoblue Test"

      
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (cardClicked) => {

    this.setState({
        activeCard: cardClicked
      }, console.log(this.state.activeCard))
      mtg.card.where({name: cardClicked}).then(result => {
        console.log(result);
        this.setState({activeimageUrl: result[0].imageUrl}, () => console.log(this.state.imageUrl))
        }
        );
  

  };


  render() {
    const csvData = this.props.listofCards;
    return (

      <div>

        <Container>

        <h2>{this.state.deckName}</h2>
        <Row>
        <Col></Col>
            <Col>
        {this.props.listofCards.map((cardamt, index) => (
        <div>
        <button className= "button" onClick={() => this.handleClick(cardamt[1])}>{cardamt[0]} {cardamt[1]}</button>
        <br></br>
        <br></br>
        </div>
            ))}
            </Col>
             <Col>         <p>{this.state.activeCard}</p>
        <img src={this.state.activeimageUrl}></img></Col>
           
        </Row>

        
     

        </Container>

        <CSVLink data={csvData}>Download Decklist</CSVLink>


        <Container>
         <Row>
            <Col><h2>Comments</h2></Col>
             <Col></Col>
            <Col></Col>
        </Row>
         <Row>
            <Col>Comment</Col>
            <Col>Comment text</Col>
            <Col></Col>
        </Row>
        </Container>

        
      </div>
    );
  }
}

export default About;