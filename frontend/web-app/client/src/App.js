import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/protected/HomePage";
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
          <Route
            path="/signup"
            exact
            render={() => <LoginPage isSignUp={true} />}
          />
          <Route path="/forgot-password" exact component={ForgotPasswordPage} />
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
