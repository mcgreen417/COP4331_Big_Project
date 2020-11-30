import React from "react";

import Header from "../../components/Header";
import "../../css/protected/pages/NewEntryPage.css";
import FormBoxModify from "../../components/protected/FormBoxModify";
import { withRouter } from "react-router-dom";

class ModifyEntryPage extends React.Component {
  constructor(props) {
    super(props);
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
        <FormBoxModify />
      </div>
    );
  }
}

export default withRouter(ModifyEntryPage);
