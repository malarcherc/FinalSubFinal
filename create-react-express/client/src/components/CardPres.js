import React from "react";
const mtg = require("mtgsdk");

class CardContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: "Black lotus",
          imageUrl: null,
          cmc: props.cmc,
          colors: props.colors,
          type: props.type,
          supertypes: props.supertypes,
          set: props.set,
          text: props.text,
          toughness: props.toughness
        };
    }
  
    componentDidMount() {
      mtg.card.where({name: this.state.name}).then(result => {
        console.log(result);
        this.setState({imageUrl: result[0].imageUrl}, () => console.log(this.state.imageUrl))// "Black Lotus"
        }
        );
    }
  
    componentWillUnmount() {
      
    }

    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.name}.</h2>
        </div>
      );

    }
  }

  export default CardContainer;