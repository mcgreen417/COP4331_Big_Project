import React from "react";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";

import Header from "../../components/Header";
import "../../css/protected/pages/SearchPage.css";

class SearchPage extends React.Component {
  render() {
    return (
      <div className="homepage">
        <Header />
        <h1>Search Page</h1>
      </div>
    );
  }
}

export default SearchPage;
