import axios from 'axios';

const API_URL = 'http://localhost:3000/api/students';

// Fetch students with filters
export const fetchStudentsAPI = async (filters) => {
  try {
    console.log('Fetching students with filters:', filters);
    const response = await axios.get(API_URL, { params: filters });
    return response;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw new Error('Failed to fetch students');
  }
};

// Add a new student
export const addStudentAPI = async (newStudent) => {
  try {
    console.log('Adding new student:', newStudent);
    const response = await axios.post(API_URL, newStudent);
    console.log('New student added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add student:', error);
    throw new Error('Failed to add student');
  }
};

// Update an existing student
export const updateStudentAPI = async (id, updatedData) => {
  try {
    console.log(`Updating student with ID: ${id}`, updatedData);
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    console.log('Student updated:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update student with ID: ${id}`, error);
    throw new Error('Failed to update student');
  }
};

// Delete a student
export const deleteStudentAPI = async (id) => {
  try {
    console.log(`Deleting student with ID: ${id}`);
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Student with ID: ${id} deleted`);
  } catch (error) {
    console.error(`Failed to delete student with ID: ${id}`, error);
    throw new Error('Failed to delete student');
  }
};
