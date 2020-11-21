import React from "react";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";

import Header from "../../components/Header";
import "../../css/protected/NewEntry.css";

class NewEntry extends React.Component {
  render() {
    return (
      <div className="homepage">
        <Header />
        <h1>New Entry</h1>
      </div>
    );
  }
}

export default NewEntry;
