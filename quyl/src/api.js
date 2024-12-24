import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/students' });

export const fetchStudents = () => API.get('/');
export const addStudent = (student) => API.post('/', student);
export const updateStudent = (id, updates) => API.put(`/${id}`, updates);
export const deleteStudent = (id) => API.delete(`/${id}`);
