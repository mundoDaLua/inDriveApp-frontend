import axios from 'axios';

const api = axios.create({
  baseURL: 'http://teste.peralta.email',
});

export default api;