import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prepartyserver.me/',
  // baseURL: 'http://142.93.48.40',
  // baseURL: 'http://192.168.100.28:3333',
});

export default api;
