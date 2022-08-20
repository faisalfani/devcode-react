import axios from 'axios';

const client = axios.create({
  baseURL: 'https://todo.api.devcode.gethired.id',
});

export default client;
