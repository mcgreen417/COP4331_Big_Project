import React from "react";
import {} from "react-bootstrap";

import "../../css/protected/RightBoxHome.css";
import cutePlant from "../../images/cute-plant.png";

class RightBoxHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      species: "Cilantro",
      nickname: "Silly Cilantro",
    };
  }

  // Reminders API should be:
  // Input: userId
  // Output: List of all reminders for each plant with: image url from S3, nickname, species, and water in days
  // Grab all Urls on S3 associated with a user ID, then use each of those urls and cut it down into its plant identifier.
  // Next
  generateReminders() {
    return (
      <div>
        <img
          className="image"
          alt="Cute plant on home page"
          src={cutePlant}
          width={200}
          height={200}
        />
        <div className="paragraphs">
          <p>
            <u>Nickname:</u> {this.state.nickname}
          </p>
          <p>
            <u>Species:</u> {this.state.species}
          </p>
          <p>
            <u>Reminder:</u> Water in <b>{this.state.days} days</b>
          </p>
        </div>
        <div className="sequent-line"></div>
      </div>
    );
  }

  render() {
    return (
      <div className="right-box">
        <p className="reminders-text">
          You have upcoming reminders for the following plants...
        </p>
        <div className="first-line"></div>
        {this.generateReminders()}
      </div>
    );
  }
}

export default RightBoxHome;
