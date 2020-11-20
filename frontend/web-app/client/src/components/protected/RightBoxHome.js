import React from "react";
import {} from "react-bootstrap";

import "../../css/protected/RightBoxHome.css";

class RightBoxHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="right-box">
        <p className="reminders-text">
          You have upcoming reminders for the following plants...
        </p>
      </div>
    );
  }
}

export default RightBoxHome;
