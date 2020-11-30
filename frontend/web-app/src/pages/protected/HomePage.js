import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import LeftBoxHome from "../../components/protected/LeftBoxHome";
import RightBoxHome from "../../components/protected/RightBoxHome";

import "../../css/protected/pages/HomePage.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      plantPhotos: [],
    };
  }

  componentDidMount() {
    if (!localStorage.accessToken) {
      this.props.history.push("/");
    }
    fetch("/protected/fetchUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          username: data.Username,
          plantPhotos: data.photoObjects,
        });
      })
      .catch((_) => localStorage.clear() && this.props.history.push("/"));
  }

  render() {
    if (this.props.logout) {
      localStorage.clear();
    }
    return (
      <div className="homepage">
        <Header />
        <LeftBoxHome
          username={this.state.username}
          plantPhotos={this.state.plantPhotos}
        />
        {this.state.username && <div className="middle-line" />}
        <br />
        {this.state.username && <RightBoxHome />}
      </div>
    );
  }
}

export default withRouter(HomePage);
