
import React from 'react';

import './decklist.css';
import 'bootstrap/dist/css/bootstrap.css';

import { CSVLink, CSVDownload } from "react-csv";
import { card } from 'mtgsdk';
import CardButton from './CardButton';
import CardPres from "./CardPres";
import {Form, FormControl, Navbar, Nav, NavDropdown, Button, Col, Row, Container} from 'react-bootstrap';



const mtg = require("mtgsdk")



class Decklist extends React.Component {
  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      hasBeenClicked: false,
      activeCard:null,
      activeImageUrl:null,
      deckName: props.deckName


      
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeDeckname = this.changeDeckname.bind(this);
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

  changeDeckname = () => {

    this.setState({
        deckName: "Monored Test"
      });
  
  

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
        <Button className= "button" onClick={() => this.handleClick(cardamt[1])}>{cardamt[0]} {cardamt[1]}</Button>
        <br></br>
        <br></br>
        </div>
            ))}
            </Col>

             <Col> <p>{this.state.activeCard}</p>
        <img src={this.state.activeimageUrl}></img>
        <button className= "button" onClick={() => this.changeDeckname()}>change</button></Col>
           
        </Row>

        
     

        </Container>

        <CSVLink data={csvData}>Download Decklist</CSVLink>


        <Container className="CommentsSection">
         <Row>
            <Col><h2>Comments</h2></Col>
             <Col></Col>
            <Col></Col>
        </Row>
         <Row>
            <Col>ExtraCheese</Col>
            <Col>
            <Container>
            Wow this deck Looks Really Strong
            </Container>
            </Col>
            <Col></Col>
        </Row>
        </Container>

        
      </div>
    );
  }
}

export default Decklist;