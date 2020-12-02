import React from "react";

import "../../css/protected/components/RightBoxHome.css";
import { withRouter } from "react-router-dom";

class RightBoxHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      species: "Cilantro",
      nickname: "Silly Cilantro",
      reminders: [],
    };
  }

  componentDidMount() {
    fetch("/protected/fetchReminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.reminders) {
          this.setState({ reminders: data.reminders });
          console.log(data.reminders);
        }
      });
  }

  viewEntryWithPlantId(plantId) {
    this.props.history.push({
      pathname: "/viewentry",
      state: { plantId: plantId },
    });
  }

  isEmpty(item) {
    return (
      item.Reminders.watered != 0 ||
      item.Reminders.fertilized != 0 ||
      item.Reminders.rotated != 0
    );
  }

  generateReminders() {
    return (
      <>
        {this.state.reminders.map((item, idx) => (
          <div key={idx}>
            {this.isEmpty(item) && (
              <>
                <img
                  className="image-reminder"
                  alt="Cute plant on home page"
                  src={item.plantUrl}
                />
                <div className="paragraphs">
                  <p>
                    <u>Nickname:</u> {item.Nickname}
                  </p>
                  <p>
                    <u>Species:</u> {item.Species}
                  </p>
                  <p>
                    <u>Reminder:</u>{" "}
                    {item.Reminders.watered != 0 && (
                      <>
                        {" "}
                        water in <b>{item.Reminders.watered} days,</b>
                      </>
                    )}
                    {item.Reminders.fertilized != 0 && (
                      <>
                        {" "}
                        fertilize in <b>{item.Reminders.fertilized} days,</b>
                      </>
                    )}
                    {item.Reminders.rotated != 0 && (
                      <>
                        {" "}
                        rotate in <b>{item.Reminders.rotated} days,</b>
                      </>
                    )}
                  </p>
                  <p
                    className="click-here"
                    onClick={() => this.viewEntryWithPlantId(item.PlantID)}
                  >
                    Click here to view entry
                  </p>
                </div>
                <div className="sequent-line"></div>
              </>
            )}
          </div>
        ))}
      </>
    );
  }

  render() {
    console.log(this.state.reminders);
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

export default withRouter(RightBoxHome);
