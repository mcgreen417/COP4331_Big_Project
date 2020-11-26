import React from "react";
import { Image } from "react-bootstrap";

import Header from "../../components/Header";
import "../../css/protected/pages/NewEntryPage.css";
import Uploadbutton from "../../images/uploadButton.png";
import cancelButton from "../../images/cancel-button.png";
import FormBoxEntry from "../../components/protected/FormBoxEntry";
import ViewBoxEntry from "../../components/protected/ViewBoxEntry";

class ViewEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantId: null,
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
      // TODO: Probably put an alert.
      this.props.history.push("/");
    }
  }

  modifyEntry() {}

  render() {
    return (
      <div className="new-entry-page">
        <Header />
        <Image
          className="upload-image"
          src={Uploadbutton}
          alt="Download Image from S3"
          width={300}
          height={300}
        />
        <ViewBoxEntry />
        <br></br>
        <br></br>
        <div className="button-set">
          <input
            className="modify-button"
            type="image"
            src={modifyEntryButton}
            width={300}
            height={64}
            onClick={this.modifyEntry}
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

export default ViewEntryPage;
