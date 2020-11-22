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
  };

  render() {
    return (
      <div className="new-entry-page">
        <Header />
        <label for="file-input">
          <Image
            type="file"
            className="upload-image"
            src={Uploadbutton}
            alt="Click for uploading image"
            onClick={this.uploadHandler}
            width={300}
            height={300}
          />
        </label>
        <input
          id="file-input"
          name=""
          type="file"
          onClick={this.fileChangedHandler}
        />
      </div>
    );
  }
}

export default NewEntryPage;
