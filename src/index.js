import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./Store";
import AircraftChecklist from "./Components/aircraft-checklist";
import WithChecklistHoc from "./Components/with-checklist-hoc";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";

const Navigation = () => (
  <header>
    <Link to="/">Aircraft Checklist</Link>
    <Link to="/engineers">Engineer Rosta</Link>
    <Link to="/about">About</Link>
  </header>
);

const About = () => (
  <div className="about">
    <p>About this app</p>
  </div>
);

// The application is easily extended with additional checklists using
// the 'WithChecklist' higher order component. A basic checklist (with no extra items)
// can be created as below, by passing a null returning componenet to WithChecklistHoc
const EngineerChecklist = WithChecklistHoc(() => null);

const App = () => (
  <Provider store={store}>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <AircraftChecklist source={"aircraft"} />
        </Route>
        <Route exact path="/engineers">
          <EngineerChecklist source={"engineers"} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
      <div className="footer"></div>
    </Router>
  </Provider>
);

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

serviceWorker.register();
