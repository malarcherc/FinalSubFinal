// src/components/ClickityClick.js
import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { card } from 'mtgsdk';
import CardButton from './CardButton';
import Decklist from './Decklist';
import { Button } from 'react-bootstrap';

class UserLoginPage extends React.Component {
  constructor(props) {
    super(props);
    // Define the initial state:
    this.state = {
      hasBeenClicked: false,
      
    };
  }

  
  clickMe = () => {
    this.props.clickMe()
}

  render() {
    const csvData = [
        [3, "Uro"], [2, "Time Walk"], [1, "Falkenreath Aristocrat"]];
        console.log(this.props.favoriteCard);
  
    return (
    
      <div>

         <Button onClick={this.clickMe}>Logout</Button>
         <Button >{this.props.favoriteCard}</Button>

          <Decklist deckName={"RAMP"} userName={"ROOT"} description={"This is the description"} listofCards={[
        [3, "Time Warp"], [2, "Time Walk"], [1, "Brainstorm"],[3,"Ponder"],[1, "Brainstorm"],[3,"Lux Cannon"],[1, "See the Truth"],[3,"Island"],[1, "Brainstorm"],[3,"ponder"]
      ]}></Decklist>

      </div>
    );
  }
}

export default UserLoginPage;