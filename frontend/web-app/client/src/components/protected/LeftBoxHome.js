import React from "react";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";

import "../../css/protected/LeftBoxHome.css";
import cutePlant from "../../images/cute-plant.png";

class LeftBoxHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    fetch("/protected/fetchUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.accessToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ username: data.Username }));
  }

  render() {
    return (
      <div className="left-box">
        <div className="left-box-text">
          {!this.state.username && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {this.state.username && (
            <div className="welcome-text">
              Good afternoon, <br />
              {`${this.state.username}!`}
            </div>
          )}
          <br />
          <p className="subtext">
            Ready for another day of gardening? <br />
            <br />
            Let Flower Power lend you a hand!
          </p>
        </div>
        <img className="cutePlant" src={cutePlant} width={188} height={200} />
        <hr className="left-horizontal-line" />
        <br />
        <Container className="container">
          <Row>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" rounded />
            </Col>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" roundedCircle />
            </Col>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" thumbnail />
            </Col>
          </Row>
        </Container>
        <div className="middle-line" />
        <br />
        {/* TODO: Implement text and plant pictures */}
      </div>
    );
  }
}

export default LeftBoxHome;
