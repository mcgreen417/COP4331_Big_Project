import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

import createEntryButton from "../../images/create-entry-button.png";
import cancelButton from "../../images/cancel-button.png";
import "../../css/protected/components/FormBoxEntry.css";
import ImageSetEntry from "./ImageSetEntry";
import { withRouter } from "react-router-dom";

class FormBoxModify extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
    const {
      nickname,
      species,
      dateAcquired,
      plantId,
      daysWatered,
      daysFertilized,
      daysRotated,
      water,
      sunlight,
      notes,
    } = this.props.location.state;
    this.state = {
      plantId: plantId,
      nickname: nickname,
      species: species,
      dateAcquired: dateAcquired,
      daysWatered: daysWatered,
      daysFertilized: daysFertilized,
      daysRotated: daysRotated,
      selected: 0,
      beenClicked: [0, 0, 0, 0, 0, 0, 0],
      water: water,
      sunlight: sunlight,
      notes: notes,
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

  updateHandler = async () => {
    if (
      !this.state.nickname ||
      !this.state.species ||
      !this.state.dateAcquired
    ) {
      console.log("State missing data");
    }
    console.log(this.classificationArray);
    const response = await fetch("/protected/editEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.accessToken,
      },
      body: JSON.stringify({
        plantid: this.state.plantId,
        nickname: this.state.nickname,
        species: this.state.species,
        sunlight: this.state.sunlight,
        water: this.state.water,
        notes: this.state.notes,
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
    if (response.status === 200) {
      this.props.history.push("/home");
    } else {
      console.log("Unsuccessful update");
    }
  };

  render() {
    return (
      <>
        <div className="modify-left">
          <Form>
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
                placeholder="(yyyy-mm-dd)"
                value={this.state.dateAcquired}
                onChange={(e) =>
                  this.setState({ dateAcquired: e.target.value })
                }
              />
            </Form.Group>
            <h1 className="h1-label">Reminders</h1>
            <p className="p-text">
              (Leave the number blank if not applicable.)
            </p>
          </Form>

          <Form>
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
            <br />
            <Form.Group className="" controlId="formBasicEmail">
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
        </div>

        <Container className="another-container">
          <h1 className="form-label">
            Plant Classification{" "}
            <span className="lower-span">(Select up to 3.)</span>
          </h1>
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
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="text-label">Notes</Form.Label>
            <Form.Control
              className="text-control"
              as="textarea"
              rows={3}
              placeholder={this.props.location.state.notes}
              value={this.state.notes}
              onChange={(e) => this.setState({ notes: e.target.value })}
            />
          </Form.Group>
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
            onClick={this.updateHandler}
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

export default withRouter(FormBoxModify);
