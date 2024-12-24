import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cohort: 'AY 2024-25',
  course: 'CBSE 9',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCohortFilter: (state, action) => {
      state.cohort = action.payload;
    },
    setCourseFilter: (state, action) => {
      state.course = action.payload;
    },
  },
});

export const { setCohortFilter, setCourseFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
