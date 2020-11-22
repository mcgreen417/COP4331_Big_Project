import React from "react";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";

import Header from "../../components/Header";
import "../../css/protected/pages/NewEntryPage.css";
import Uploadbutton from "../../images/uploadButton.png";

class NewEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  componentDidMount() {
    if (!localStorage.accessToken) {
      this.props.history.push("/");
    }
  }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

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
      .then((data) => console.log(data));
  };

  render() {
    return (
      <div className="new-entry-page">
        <Header />
        <label htmlFor="file-input">
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
          onChange={this.fileChangedHandler}
        />
        <br></br>
        <br></br>
        <button onClick={this.uploadHandler} />
      </div>
    );
  }
}

export default NewEntryPage;
