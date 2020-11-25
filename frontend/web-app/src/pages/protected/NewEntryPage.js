import React from "react";
import { Form, Button, Image } from "react-bootstrap";

import Header from "../../components/Header";
import "../../css/protected/pages/NewEntryPage.css";
import Uploadbutton from "../../images/uploadButton.png";
import createEntryButton from "../../images/create-entry-button.png";
import cancelButton from "../../images/cancel-button.png";
import FormBoxEntry from "../../components/protected/FormBoxEntry";

class NewEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantId: null,
      selectedFile: null,
      nickname: "",
      species: "",
      dateAcquired: "",
      watered: 0,
      fertilized: 0,
      rotated: 0,
      classifications: [],
      sunlight: 0,
      water: 0,
    };
  }

  componentDidMount() {
    if (!localStorage.accessToken) {
      this.props.history.push("/");
    }
  }

  createNewEntry() {
    if (
      !this.state.plantId ||
      !this.state.selectedFile ||
      !this.state.nickname ||
      !this.state.species ||
      !this.state.dateAcquired ||
      !this.state.classifications
    ) {
      console.log("Error, some data is missing");
      return;
    }
    this.uploadHandler();
  }

  uploadHandler = () => {
    console.log(this.state.selectedFile);
    if (!this.state.selectedFile) {
      console.log("No Image to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    fetch("/protected/testUpload", {
      method: "POST",
      headers: {
        Authorization: localStorage.accessToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ plantId: data.plantId }))
      .then(() => this.createNewEntry());
  };

  render() {
    return (
      <div className="new-entry-page">
        <Header />
        <label className="upload-image" htmlFor="file-input">
          <Image
            className="upload-image"
            src={Uploadbutton}
            alt="Click for uploading image"
            width={300}
            height={300}
          />
        </label>
        <input
          id="file-input"
          name=""
          type="file"
          onChange={(e) => this.setState({ selectedFile: e.target.files[0] })}
        />
        <FormBoxEntry />
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
      </div>
    );
  }
}

export default NewEntryPage;
