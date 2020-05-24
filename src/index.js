import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./Store";
import AircraftChecklist from "./Components/aircraft-checklist";
import WithChecklistHoc from "./Components/with-checklist-hoc";
import Home from "./Components/home"
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";

const Navigation = () => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/aircraft">Aircraft Checklist</Link>
    <Link to="/engineers">Engineer Roster</Link>
  </header>
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
          <Home />
        </Route>
        <Route exact path="/aircraft">
          <AircraftChecklist source={"aircraft"} checkboxLabel={"done"} />
        </Route>
        <Route exact path="/engineers">
          <EngineerChecklist
            source={"engineers"}
            checkboxLabel={"availability"}
          />
        </Route>
      </Switch>
      <div className="footer"></div>
    </Router>
  </Provider>
);

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

serviceWorker.register();
