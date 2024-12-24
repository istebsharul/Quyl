import { combineReducers } from 'redux';
import studentsReducer from '../features/students/studentsSlice';
import filtersReducer from '../features/filters/filtersSlice';

const rootReducer = combineReducers({
  students: studentsReducer,
  filters: filtersReducer,
});

export default rootReducer;
