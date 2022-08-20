import axios from 'axios';
import { email } from './constanst';

const client = axios.create({
  baseURL: 'https://todo.api.devcode.gethired.id',
  params: {
    email: encodeURI(email),
  },
});

export default client;
