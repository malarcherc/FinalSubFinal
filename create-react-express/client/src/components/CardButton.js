// src/components/ClickityClick.js
import React from 'react';

class CardButton extends React.Component {
  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      hasBeenClicked: false
    };
  }

  handleClick = () => {
    // Update our state here...
    this.setState({
        hasBeenClicked: true
      })

  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{this.props.number} {this.props.name}</button>
        <br></br>
      </div>
    );
  }
}

export default CardButton;