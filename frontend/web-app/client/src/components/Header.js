import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "../css/Header.css";

function Header(props) {
  const links = props.default
    ? ["About", "Sign up", "Log in"]
    : ["Home", "Search", "Nursery", "Account"];
  const generatedLinks = links.map((link, idx) => (
    <Nav.Link
      key={idx}
      className="white-text spacing"
      href={link.toLowerCase().split(" ").join("")}
    >
      {link}
    </Nav.Link>
  ));

  return (
    <Navbar className="Navbar-header" expand="lg">
      <Navbar.Brand className="white-text" href="#home">
        ❀ Flower Power ❀
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">{generatedLinks}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
