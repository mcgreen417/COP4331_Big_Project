import React from "react";
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";

import "../../css/protected/components/FormBoxEntry.css";
import sunOn from "../../images/sun-on.png";
import sunOff from "../../images/sun-off.png";
import cloudOn from "../../images/cloud-on.png";
import cloudOff from "../../images/cloud-off.png";

class FormBoxEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      species: "",
      dateAcquired: "",
      daysWatered: 0,
      daysFertilized: 0,
      daysRotated: 0,
      sunlight: 0,
      water: 0,
      selected: 0,
      beenClicked: [[0, 0, 0], [0, 0, 0], [0]],
    };
  }

  changeSunlight() {
    return (
      <>
        {this.state.sunlight === 0 && (
          <>
            <Image
              src={sunOff}
              onClick={() => this.setState({ sunlight: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.setState({ sunlight: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.setState({ sunlight: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.state.sunlight === 1 && (
          <>
            <Image
              src={sunOn}
              onClick={() => this.setState({ sunlight: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.setState({ sunlight: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.setState({ sunlight: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.state.sunlight === 2 && (
          <>
            <Image
              src={sunOn}
              onClick={() => this.setState({ sunlight: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOn}
              onClick={() => this.setState({ sunlight: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOff}
              onClick={() => this.setState({ sunlight: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.state.sunlight === 3 && (
          <>
            <Image
              src={sunOn}
              onClick={() => this.setState({ sunlight: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOn}
              onClick={() => this.setState({ sunlight: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={sunOn}
              onClick={() => this.setState({ sunlight: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
      </>
    );
  }

  changeWater() {
    return (
      <>
        {this.state.water === 0 && (
          <>
            <Image
              src={cloudOff}
              onClick={() => this.setState({ water: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.setState({ water: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.setState({ water: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.state.water === 1 && (
          <>
            <Image
              src={cloudOn}
              onClick={() => this.setState({ water: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.setState({ water: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.setState({ water: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.state.water === 2 && (
          <>
            <Image
              src={cloudOn}
              onClick={() => this.setState({ water: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOn}
              onClick={() => this.setState({ water: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOff}
              onClick={() => this.setState({ water: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
        {this.state.water === 3 && (
          <>
            <Image
              src={cloudOn}
              onClick={() => this.setState({ water: 1 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOn}
              onClick={() => this.setState({ water: 2 })}
              alt="sun"
              width={59}
              height={59}
            />
            <Image
              src={cloudOn}
              onClick={() => this.setState({ water: 3 })}
              alt="sun"
              width={59}
              height={59}
            />
          </>
        )}
      </>
    );
  }

  doCheck(x, y) {
    if (!this.state.beenClicked[x][y] && this.state.selected < 3) {
      this.setState((prevState) => {
        let newState = this.state.beenClicked.slice();
        newState[x][y] = 1;
        return { beenClicked: newState, selected: prevState.selected + 1 };
      });
    } else if (this.state.beenClicked[x][y]) {
      this.setState((prevState) => {
        let newState = this.state.beenClicked.slice();
        newState[x][y] = 0;
        return { beenClicked: newState, selected: prevState.selected - 1 };
      });
    }
  }

  render() {
    return (
      <>
        <Form className="entry-form-box">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label">Plant Nickname</Form.Label>
            <Form.Control
              className="nickname-field"
              type="username"
              placeholder="Plant nickname"
              value={this.state.nickname}
              onChange={(e) => this.setState({ nickname: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label">Plant Species</Form.Label>
            <Form.Control
              className="species-field"
              type="username"
              placeholder="Plant species"
              value={this.state.species}
              onChange={(e) => this.setState({ species: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label">Date Acquired</Form.Label>
            <Form.Control
              className="date-field"
              type="username"
              placeholder="(mm/dd/yy)"
              value={this.state.dateAcquired}
              onChange={(e) => this.setState({ dateAcquired: e.target.value })}
            />
          </Form.Group>
          <h1 className="h1-label">Reminders</h1>
          <p className="p-text">(Leave the number blank if not applicable.)</p>
        </Form>

        <Form className="second-form">
          <Form.Group controlId="formBasicEmail">
            <p className="left-text">
              This plant needs to be <strong>watered</strong> every
            </p>
            <Form.Control
              className="form-state"
              type="username"
              placeholder="##"
              value={this.state.daysWatered}
              onChange={(e) => this.setState({ daysWatered: e.target.value })}
            />
            <p className="after-text">days.</p>
          </Form.Group>
          <br />
          <Form.Group className="second" controlId="formBasicEmail">
            <p className="left-text">
              This plant needs to be <strong>fertilized</strong> every
            </p>
            <Form.Control
              className="form-state"
              type="username"
              placeholder="##"
              value={this.state.daysFertilized}
              onChange={(e) =>
                this.setState({ daysFertilized: e.target.value })
              }
            />
            <p className="after-text">days.</p>
          </Form.Group>
          <br />
          <Form.Group className="group" controlId="formBasicEmail">
            <p className="left-text">
              This plant needs to be <strong>rotated</strong> every
            </p>
            <Form.Control
              className="form-state"
              type="username"
              placeholder="##"
              value={this.state.daysRotated}
              onChange={(e) => this.setState({ daysRotated: e.target.value })}
            />
            <p className="after-text">days.</p>
          </Form.Group>
          <br />
          <br />
        </Form>
        <Container className="another-container">
          <h1 className="form-label">Plant Classification</h1>
          <br />
          <Row>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[0][0] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(0, 0)}
              >
                Algae
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[0][1] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(0, 1)}
              >
                Flower
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[0][2] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(0, 2)}
              >
                Fruit
              </Button>{" "}
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[1][0] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(1, 0)}
              >
                Grass
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[1][1] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(1, 1)}
              >
                Herb
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[1][2] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(1, 2)}
              >
                Moss
              </Button>{" "}
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[2][0] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(2, 0)}
              >
                Other
              </Button>{" "}
            </Col>
          </Row>
        </Container>
        <div className="image-set-sun">
          <h1 className="sun-label">Sunlight Needed</h1>
          {this.changeSunlight()}
        </div>
        <div className="image-set-cloud">
          <h1 className="water-label">Water Needed</h1>
          {this.changeWater()}
        </div>
      </>
    );
  }
}

export default FormBoxEntry;
