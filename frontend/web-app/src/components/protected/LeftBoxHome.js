import React from "react";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import "../../css/protected/components/LeftBoxHome.css";
import cutePlant from "../../images/cute-plant.png";

class LeftBoxHome extends React.Component {
  constructPlantPhotosContainer() {
    // TODO: Make this scrollable
    return (
      <Container className="container plants">
        <Row>
          {this.props.plantPhotos.map((object, idx) => (
            <Col className="col-photo" key={idx} xs={6} md={4}>
              <Image
                className="image"
                src={object.url}
                onClick={() => this.viewEntry(object.plantId)}
                rounded
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  viewEntry(plantId) {
    this.props.history.push({
      pathname: "/viewentry",
      state: { plantId: plantId },
    });
  }

  topLeft() {
    return (
      <>
        {!this.props.username && (
          <Spinner className="spin" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {this.props.username && (
          <>
            <div className="left-box-text">
              <div className="welcome-text">
                Good afternoon, <br />
                {`${this.props.username}!`}
              </div>
              <br />
              <p className="top-left-sub-text">
                Ready for another day of gardening? <br />
                <br />
                Let Flower Power lend you a hand!
              </p>
            </div>
            <img
              className="cute-plant"
              alt="Cute plant on home page"
              src={cutePlant}
              width={188}
              height={200}
            />{" "}
            <hr className="left-horizontal-line" />
            <br />
            <p className="check-information-text">
              Check information for any of your plants below!
            </p>
          </>
        )}
      </>
    );
  }
  render() {
    return (
      <div className="left-box">
        {this.topLeft()}
        {this.constructPlantPhotosContainer()}
      </div>
    );
  }
}

export default withRouter(LeftBoxHome);
