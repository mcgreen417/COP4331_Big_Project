import React from "react";
import { Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Header from "../../components/Header";
import ViewBoxEntry from "../../components/protected/ViewBoxEntry";
import "../../css/protected/pages/ViewEntryPage.css";

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
      this.props.history.push("/");
    }
  }

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
      </div>
    );
  }
}

export default withRouter(ViewEntryPage);
