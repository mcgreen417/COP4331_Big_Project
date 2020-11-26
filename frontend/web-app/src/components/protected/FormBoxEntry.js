import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

import createEntryButton from "../../images/create-entry-button.png";
import cancelButton from "../../images/cancel-button.png";
import "../../css/protected/components/FormBoxEntry.css";
import ImageSetEntry from "./ImageSetEntry";

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
      selected: 0,
      beenClicked: [0, 0, 0, 0, 0, 0, 0],
      water: 0,
      sunlight: 0,
    };

    this.updateSunlight = this.updateSunlight.bind(this);
    this.updateWater = this.updateWater.bind(this);
  }

  updateSunlight(x) {
    this.setState({ sunlight: x });
  }

  updateWater(x) {
    this.setState({ water: x });
  }

  doCheck(x) {
    if (!this.state.beenClicked[x] && this.state.selected < 3) {
      this.setState((prevState) => {
        let newState = this.state.beenClicked.slice();
        newState[x] = 1;
        return { beenClicked: newState, selected: prevState.selected + 1 };
      });
    } else if (this.state.beenClicked[x]) {
      this.setState((prevState) => {
        let newState = this.state.beenClicked.slice();
        newState[x] = 0;
        return { beenClicked: newState, selected: prevState.selected - 1 };
      });
    }
  }

  classificationArray() {
    const mapper = {
      0: "Algae",
      1: "Flower",
      2: "Fruit",
      3: "Grass",
      4: "Herb",
      5: "Moss",
      6: "Other",
    };
    const mapStrings = this.state.beenClicked.map((val, idx) => {
      if (val === 1) {
        return mapper[idx];
      }
    });

    return mapStrings.filter((val) => val !== undefined);
  }

  uploadHandler = async () => {
    const plantId = await this.props.uploadPhoto();

    if (!plantId) {
      console.log("Could not fetch Plant ID");
    }

    if (
      !this.state.nickname ||
      !this.state.species ||
      !this.state.dateAcquired
    ) {
      console.log("State missing data");
    }

    const response = await fetch("/protected/newEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.accessToken,
      },
      body: JSON.stringify({
        plantid: plantId,
        nickname: this.state.nickname,
        species: this.state.nickname,
        sunlight: this.state.sunlight,
        water: this.state.water,
        notes: "",
        date: this.state.dateAcquired,
        classification: this.classificationArray(),
        reminders: {
          watered: this.state.daysWatered,
          fertilized: this.state.daysFertilized,
          rotated: this.state.daysRotated,
        },
      }),
    });

    const json = await response.json();
    console.log(json);
  };

  render() {
    console.log(this.state.sunlight);
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
              placeholder="(yyyy/mm/dd)"
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
                  this.state.beenClicked[0] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(0)}
              >
                Algae
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[1] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(1)}
              >
                Flower
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[2] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(2)}
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
                  this.state.beenClicked[3] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(3)}
              >
                Grass
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[4] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(4)}
              >
                Herb
              </Button>{" "}
            </Col>
            <Col xs>
              <Button
                className={
                  this.state.beenClicked[5] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(5)}
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
                  this.state.beenClicked[6] && this.state.selected < 4
                    ? "activated"
                    : ""
                }
                variant="success"
                onClick={() => this.doCheck(6)}
              >
                Other
              </Button>{" "}
            </Col>
          </Row>
        </Container>
        <ImageSetEntry
          updateSunlight={this.updateSunlight}
          updateWater={this.updateWater}
          sunlight={this.state.sunlight}
          water={this.state.water}
        />
        <br></br>
        <br></br>
        <div className="button-set">
          <input
            className="entry-button"
            type="image"
            src={createEntryButton}
            width={300}
            height={64}
            onClick={this.uploadHandler}
          />
          <input
            type="image"
            src={cancelButton}
            width={300}
            height={64}
            onClick={() => this.props.history.push("/")}
          />
        </div>
      </>
    );
  }
}

export default FormBoxEntry;
