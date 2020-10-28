import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar className="App-header" expand="lg">
        <Navbar.Brand className="white-text" href="#home">❀ Flower Power ❀</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="white-text spacing" href="#home">About</Nav.Link>
            <Nav.Link className="white-text spacing" href="#link">Sign up</Nav.Link>
            <Nav.Link className="white-text spacing" href="#link">Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
