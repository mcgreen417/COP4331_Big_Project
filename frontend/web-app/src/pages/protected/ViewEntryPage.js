import React from "react";
import { Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Header from "../../components/Header";
import deleteButton from "../../images/delete-entry.png";
import modifyEntryButton from "../../images/modify-entry.png";
import ViewBoxEntry from "../../components/protected/ViewBoxEntry";

class ViewEntryPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
    this.state = {
      plantId: this.props.location.state.plantId || "",
      plantUrl: null,
    };

    this.setPlantUrl = this.setPlantUrl.bind(this);
  }

  setPlantUrl(url) {
    this.setState({ plantUrl: url });
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
          src={this.state.plantUrl}
          alt="Download Image from S3"
          width={300}
          height={300}
        />
        <ViewBoxEntry
          plantid={this.state.plantId}
          setPlantUrl={this.setPlantUrl}
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
            onClick={this.modifyEntry}
          />
          <input
            className="delete-entry"
            type="image"
            src={deleteButton}
            width={300}
            height={64}
            onClick={() => this.props.history.push("/")}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ViewEntryPage);
