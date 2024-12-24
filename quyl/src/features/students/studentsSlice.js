import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {addStudentAPI, deleteStudentAPI, fetchStudentsAPI, updateStudentAPI} from '../../api/studentsAPI';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (filters) => {
    const response = await fetchStudentsAPI(filters);
    console.log('Students fetched:', response.data);  // Debugging the payload
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (newStudent) => {
    console.log('Adding new student:', newStudent);
    const response = await addStudentAPI(newStudent);
    return response.data;
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, updatedData }) => {
    const response = await updateStudentAPI(id, updatedData);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id) => {
    await deleteStudentAPI(id);
    return id;
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    status: 'idle',
    error: null
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'; // Reset status to 'idle' for further fetches
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Students fetched:', action.payload);  // Debugging the payload
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        console.log(state.students);  // Debugging the state
        if (!state.students) {
          state.students = [];  // Ensure it's an array
        }
        state.students.push(action.payload);
      })      
      .addCase(updateStudent.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.students.findIndex(student => student.id === id);
        if (index >= 0) {
          state.students[index] = { ...state.students[index], ...updatedData };
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student.id !== action.payload);
      });
  }
});

export const { resetStatus } = studentsSlice.actions;

export default studentsSlice.reducer;
