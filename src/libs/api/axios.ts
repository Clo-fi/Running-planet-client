import axios from 'axios';
import { Cookies } from 'react-cookie';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';

    const cookies = new Cookies(['Authorization']);
    const Authorization = cookies.get('Authorization');

    if (Authorization) {
      config.headers['Authorization'] = `Bearer ${Authorization}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default instance;