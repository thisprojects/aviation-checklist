import { combineReducers } from 'redux';
import checklistReducer from './checklist-reducer'

const rootReducer = combineReducers({
  checklistReducer,
});

export default rootReducer;