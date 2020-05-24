import React from "react";
import {
  addChecklistItem,
  removeChecklistItem,
  toggleItemStatus,
} from "./../Actions";
import { useSelector, useDispatch } from "react-redux";

const RemoveItem = ({ id, source }) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(removeChecklistItem(id, source));

  return (
    <div className="checklist-item">
      <button className="remove-button" onClick={handleClick}>
        Remove Item
      </button>
    </div>
  );
}; // End of RemoveItem

const CheckBox = ({ item: { status, id }, source }) => {
  const dispatch = useDispatch();
  const handleChange = () => dispatch(toggleItemStatus(id, source));

  return (
    <div className="checklist-item checkbox">
      <input type="checkbox" defaultChecked={status} onChange={handleChange} />
    </div>
  );
}; // End of CheckBox

const MapListItems = ({ WrappedComponent, source }) => {
  const checkList = useSelector(
    (state) => state.checklistReducer.checkLists[source]
  );

  return checkList.map((item) => (
    <div
      className="checklist-row"
      style={{
        backgroundColor: item.status ? "rgba(0, 195, 0, 0.3)" : "white",
      }}
      key={ item.id }
    >
      <div className="name-id-wrapper checklist-item">
        <p className="checklist-item">{item.name}</p>
        <p className="checklist-item">ID #{item.id}</p>
      </div>
      <WrappedComponent item={ item } source={ source } />
      <RemoveItem id={ item.id } source={ source } />
      <CheckBox item={ item } source={ source } />
    </div>
  ));
}; // End of MapListItems

// Higher order component entry point - the source argument is the data model for the checklist
// (see reducer for source format)
export default (WrappedComponent) => ({ source }) => {

  // Duplicate ID's are possible, In the real world ID's would be created in some kind of sequence.
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
        source
      )
    );

    // Clear text box after each submission
    textRef.current.value = "";
  }; // End of handleClick

  return (
    <div>
      <div className="checklist-container">
        <MapListItems WrappedComponent={ WrappedComponent } source={ source } />
      </div>
      <div className="add-item">
        <input ref={ textRef } type="text" />
        <button onClick={ handleClick }>Add Item</button>
      </div>
    </div>
  );
};
