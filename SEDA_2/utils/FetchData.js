import axios from 'axios';

const FetchData = axios.create({
  baseURL: 'http://192.168.137.1:8080/api-seda',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default FetchData;

