import React from "react";
import { Spinner } from "react-bootstrap";

import "../../css/protected/LeftBoxHome.css";

class LeftBoxHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    fetch("/protected/fetchUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.accessToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ username: data.Username }));
  }

  render() {
    return (
      <div className="left-text-box">
        {!this.state.username && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {this.state.username && (
          <div className="header-text">
            {`Good afternoon, ${this.state.username}!`}
          </div>
        )}
        <br />
        {/* TODO: Implement text and plant pictures */}
      </div>
    );
  }
}

export default LeftBoxHome;
