import axios from 'axios';

const api = axios.create({
  baseURL: 'http://teste.peralta.email:8888',
});

export default api;