import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentsSlice';
import filtersReducer from '../features/filters/filtersSlice';

const store = configureStore({
  reducer: {
    students: studentsReducer,
    filters: filtersReducer,
  },
});

export default store;
