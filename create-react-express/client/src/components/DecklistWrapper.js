// src/components/ClickityClick.js
import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { card } from 'mtgsdk';
import CardButton from './CardButton';
import Decklist from './Decklist';

class DecklistWrapper extends React.Component {
  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      hasBeenClicked: false

    };
  }

  render() {
    const csvData = [
        [3, "Uro"], [2, "Time Walk"], [1, "Falkenreath Aristocrat"]];
    return (
      <div>
          <Decklist deckName={"RAMP"} userName={"ROOT"} description={"This is the description"} listofCards={[
        [3, "Time Warp"], [2, "Time Walk"], [1, "Brainstorm"],[3,"Ponder"],[1, "Brainstorm"],[3,"Lux Cannon"],[1, "See the Truth"],[3,"Island"],[1, "Brainstorm"],[3,"ponder"]
      ]}></Decklist>

      </div>
    );
  }
}

export default DecklistWrapper;