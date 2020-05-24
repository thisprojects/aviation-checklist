import React from "react";
import { assignEngineer } from "../Actions";
import { useSelector, useDispatch } from "react-redux";
import WithChecklistHoc from "./with-checklist-hoc";

const MapEngineers = () => {
  const engineers = useSelector(
    (state) => state.checklistReducer.checkLists.engineers
  );

  return engineers.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));
}; // End of MapEngineers

const EngineerDropDown = ({ item: { id, engineer }, source }) => {
  const dispatch = useDispatch();

  const handleChange = (evt) =>
    dispatch(assignEngineer(id, Number(evt.target.value), source));

  return (
    <div className="checklist-item">
      <label className="engineer-dropdown">
        <p>Engineer</p>
        <select onChange={handleChange} value={engineer}>
          <MapEngineers />
        </select>
      </label>
    </div>
  );
}; // End of EngineerDropDown

export default WithChecklistHoc(EngineerDropDown);
