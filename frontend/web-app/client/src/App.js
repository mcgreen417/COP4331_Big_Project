import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { ProtectedRoute } from "./components/protected.route";

import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Flower Power";
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/verify" exact>
            {/* // TODO: Verification page for app */}
          </Route>
          <Route path="/about" exact>
            {/* // TODO: About page for app */}
          </Route>
          <ProtectedRoute exact path="/home" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
