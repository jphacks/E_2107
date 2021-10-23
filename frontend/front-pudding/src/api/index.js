// https://qiita.com/sand/items/80a67da0a44b042f0bc3#%EF%BC%93api
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000'; 
const API_BASE_URL = 'http://XXXX:8080'; // Django用

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// export function fetchTasks() {
//   return client.get('/api/');
// }

// export function createTask(params) {
//   console.log(params)
//   return client.post('/api/', params);
// }

// export function editTask(id, params) {
//   return client.put(`/api/${id}`, params);
// }

// export function deleteTask(id) {
//   return client.delete(`/api/${id}/`);
// }