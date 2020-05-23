import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import {
  addChecklistItem,
  removeChecklistItem,
  toggleItemStatus,
  assignEngineer,
} from "./Actions";
import { Provider } from "react-redux";
import store from "./Store";
import { useSelector, useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Switch, useParams} from "react-router-dom";

const EngineerDropDown = ({ children, id, currEng, listName }) => {
  const dispatch = useDispatch();

  return (
    <div className="checklist-item">
      <label>
        Engineer
        <select
          onChange={(evt) =>
            dispatch(assignEngineer(id, Number(evt.target.value), listName))
          }
          value={currEng}
        >
          {children}
        </select>
      </label>
    </div>
  );
};

const MapEngineers = () => {
  const engineers = useSelector(
    (state) => state.checklistReducer.checkLists.engineers
  );
  console.log("engineers", engineers);

  return engineers.map((item) => <option value={item.id}>{item.name}</option>);
};

const MapListItems = ({ listName }) => {
  const checkList = useSelector(
    (state) => state.checklistReducer.checkLists[listName]
  );

  const RemoveItem = ({ id, listName }) => {
    const dispatch = useDispatch();
    const handleClick = () => dispatch(removeChecklistItem(id, listName));

    return (
      <div className="checklist-item">
        <button onClick={handleClick}>Remove Item</button>
      </div>
    );
  };

  const CheckBox = ({ status, id, listName }) => {
    const dispatch = useDispatch();
    const handleChange = () => dispatch(toggleItemStatus(id, listName));

    return (
      <div className="checklist-item">
        <input
          type="checkbox"
          defaultChecked={status}
          onChange={handleChange}
        />
      </div>
    );
  };

  return checkList.map((item) => (
    <div
      className="checklist-row"
      style={{ backgroundColor: item.status ? "green" : "white" }}
    >
      <p className="checklist-item">{item.name}</p>
      <p className="checklist-item">ID #{item.id}</p>
      <EngineerDropDown
        id={item.id}
        currEng={item.engineer}
        listName={listName}
      >
        <MapEngineers />
      </EngineerDropDown>
      <RemoveItem id={item.id} listName={listName} />
      <CheckBox id={item.id} status={item.status} listName={listName} />
    </div>
  ));
};

const CheckList = ({ listName }) => {
  let x = useParams()
  console.log(x, "params")
  const generateRandomId = () => Math.floor(Math.random() * 10000);

  const dispatch = useDispatch();

  const textRef = React.useRef();

  const handleClick = () => {
    dispatch(
      addChecklistItem(
        {
          name: textRef.current.value,
          id: generateRandomId(),
          status: false,
          engineer: 1,
        },
        listName
      )
    );
    textRef.current.value = "";
  };

  return (
    <div className="checklist-container">
      <MapListItems listName={listName} />
      <input ref={textRef} type="text" />
      <button onClick={handleClick}>Add Item</button>
    </div>
  );
};

function AviationChecklist() {
  return (
    <Provider store={store}>
      <Router>
        <div className="AviationChecklist">
          <header className="AviationChecklist-header">
            <Switch>
              <Route path="/aviation" exact>
                <CheckList listName="aviation" />
              </Route>
              <Route path="/engineers">
                <CheckList listName="engineers" />
              </Route>
            </Switch>
          </header>
        </div>
      </Router>
    </Provider>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<AviationChecklist />, rootElement);

serviceWorker.register();
