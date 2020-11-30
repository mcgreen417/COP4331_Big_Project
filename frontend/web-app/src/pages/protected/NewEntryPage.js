import React from "react";
import { Image } from "react-bootstrap";

import Header from "../../components/Header";
import "../../css/protected/pages/NewEntryPage.css";
import Uploadbutton from "../../images/uploadButton.png";
import FormBoxEntry from "../../components/protected/FormBoxEntry";

class NewEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };

    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  componentDidMount() {
    if (!localStorage.accessToken) {
      this.props.history.push("/");
    }
  }

  uploadPhoto = async () => {
    console.log(this.state.selectedFile);
    if (!this.state.selectedFile) {
      console.log("No Image to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    const response = await fetch("/protected/photoUpload", {
      method: "POST",
      headers: {
        Authorization: localStorage.accessToken,
      },
      body: formData,
    });

    const { plantID } = await response.json();

    return plantID;
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
        <FormBoxEntry uploadPhoto={this.uploadPhoto} />
      </div>
    );
  }
}

export default NewEntryPage;
