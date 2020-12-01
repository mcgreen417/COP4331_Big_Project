import React from "react";
import { Form, Container, Row, Col, Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import "../../css/protected/components/FormBoxEntry.css";
import ImageSetEntryView from "./ImageSetEntryView";
import deleteButton from "../../images/delete-entry.png";
import modifyEntryButton from "../../images/modify-entry.png";

class ViewBoxEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantUrl: null,
      nickname: "",
      species: "",
      dateAcquired: "",
      daysWatered: 0,
      daysFertilized: 0,
      daysRotated: 0,
      water: 0,
      sunlight: 0,
      classifications: [],
      show: false,
    };
  }

  componentDidMount() {
    console.log(this.props.plantid);
    if (!this.props.plantid) {
      console.log("no plant id");
      this.props.history.push("/");
    }
    fetch("/protected/viewEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.accessToken,
      },
      body: JSON.stringify({
        plantid: this.props.plantid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.setPlantUrl(data.plantUrl);
        this.setState({
          plantUrl: data.plantUrl,
          nickname: data.Nickname,
          species: data.Species,
          dateAcquired: data.DateAcquired,
          water: data.Water,
          sunlight: data.Sunlight,
          daysWatered: data.Reminders.watered || 0,
          daysFertilized: data.Reminders.fertilized || 0,
          daysRotated: data.Reminders.rotated || 0,
          classifications: data.Classification,
        });
      });
  }

  generateClassification() {
    return this.state.classifications.map((val, idx) => (
      <Col key={idx} xs>
        <Button variant="success">{val}</Button>{" "}
      </Col>
    ));
  }

  modifyEntry() {
    this.props.history.push({
      pathname: "/modifyentry",
      state: {
        plantId: this.props.plantid,
        nickname: this.state.nickname,
        species: this.state.species,
        dateAcquired: this.state.dateAcquired,
        daysWatered: this.state.daysWatered,
        daysRotated: this.state.daysRotated,
        daysFertilized: this.state.daysFertilized,
        water: this.state.water,
        sunlight: this.state.sunlight,
      },
    });
  }

  deleteEntry() {
    fetch("/protected/deleteEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.accessToken,
      },
      body: JSON.stringify({
        plantid: this.props.plantid,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <>
        <Form className="entry-form-box">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label">
              <u>Plant Nickname:</u>
            </Form.Label>{" "}
            <Form.Label className="form-label">
              {this.state.nickname}
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label viewer">
              <u>Plant Species:</u>
            </Form.Label>{" "}
            <Form.Label className="form-label">{this.state.species}</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label viewer">
              <u>Date Acquired:</u>
            </Form.Label>{" "}
            <Form.Label className="form-label">
              {this.state.dateAcquired}
            </Form.Label>
          </Form.Group>
          <br />
          <h1 className="h1-label">
            <u>Reminders:</u>
          </h1>
        </Form>

        <Form className="second-form">
          <Form.Group controlId="formBasicEmail">
            <p className="left-text">
              This plant needs to be <strong>watered</strong> every{" "}
              <strong>{this.state.daysWatered}</strong> days.
            </p>
          </Form.Group>
          <br />
          <Form.Group className="second" controlId="formBasicEmail">
            <p className="left-text">
              This plant needs to be <strong>fertilized</strong> every{" "}
              <strong>{this.state.daysFertilized}</strong> days.
            </p>
          </Form.Group>
          <br />
          <Form.Group className="group" controlId="formBasicEmail">
            <p className="left-text">
              This plant needs to be <strong>rotated</strong> every{" "}
              <strong>{this.state.daysRotated}</strong> days.
            </p>
          </Form.Group>
          <br />
          <br />
        </Form>

        <Container className="another-container">
          <h1 className="form-label">Plant Classification</h1>
          <br />
          <Row>{this.generateClassification()}</Row>
        </Container>
        <br />
        <ImageSetEntryView
          sunlight={this.state.sunlight}
          water={this.state.water}
        />
        <br></br>
        <br></br>
        <div className="button-set">
          <input
            className="modify-button"
            type="image"
            src={modifyEntryButton}
            width={300}
            height={64}
            onClick={() => this.modifyEntry()}
          />
          <input
            className="delete-entry"
            type="image"
            src={deleteButton}
            width={300}
            height={64}
            onClick={() => this.setState({ show: true })}
          />
        </div>
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this plant entry?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => this.deleteEntry()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(ViewBoxEntry);
