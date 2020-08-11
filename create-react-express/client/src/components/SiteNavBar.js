import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import {Form, FormControl, Navbar, Nav, NavDropdown, Button, Col, Row, Container} from 'react-bootstrap';

class SiteNavBar extends React.Component {

    constructor(props) {
        super(props);
        
      }
render () {
return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Magic Deck Maker</Navbar.Brand>
    <Nav className="mr-auto">


      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="/topdecks">Top Decks</Nav.Link>

    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Card Search</Button>
    </Form>
  </Navbar>
)}
  }

export default SiteNavBar;