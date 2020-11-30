import React from "react";
import { Form, Button } from "react-bootstrap";

import Header from "../../components/Header";
import "../../css/protected/pages/SearchPage.css";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      plantsSearched: [],
    };
  }

  viewEntryWithPlantId(plantId) {
    this.props.history.push({
      pathname: "/viewentry",
      state: { plantId: plantId },
    });
  }

  generateSearchResults() {
    return (
      <>
        {this.state.plantsSearched.map((item, idx) => (
          <div key={idx}>
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
                {item.Reminders.watered !== 0 && (
                  <>
                    {" "}
                    water in <b>{item.Reminders.watered} days,</b>
                  </>
                )}
                {item.Reminders.fertilized !== 0 && (
                  <>
                    {" "}
                    fertilize in <b>{item.Reminders.fertilized} days,</b>
                  </>
                )}
                {item.Reminders.rotated !== 0 && (
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
          </div>
        ))}
      </>
    );
  }

  doSearch(e) {
    e.preventDefault();
    fetch("/protected/searchEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.accessToken,
      },
      body: JSON.stringify({
        search: this.state.searchValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
          this.setState({ plantsSearched: data });
        }
      });
  }

  render() {
    return (
      <div className="homepage">
        <Header />
        <Form className="search-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="search-form-label">
              Enter a phrase below to search through your saved plants. Plants
              with a nickname or species matching the search criteria will be
              shown.
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Search criteria"
              value={this.state.searchValue}
              onChange={(e) => this.setState({ searchValue: e.target.value })}
            />
          </Form.Group>

          <Button
            className="search-button"
            variant="primary"
            type="submit"
            onClick={(e) => this.doSearch(e)}
          >
            Search
          </Button>
        </Form>
        <div className="right-box move-up">
          <p className="reminders-text">
            Currently displaying search results for: "{this.state.searchValue}"
          </p>
          <div className="first-line"></div>
          {this.generateSearchResults()}
        </div>
      </div>
    );
  }
}

export default SearchPage;
