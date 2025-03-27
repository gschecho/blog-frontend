import axios from 'axios';

const BASE_URL = 'https://api.example.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// AÑADE TOKEN A LAS SOLICITUDES

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  } 
);

// INTERCEPTOR PARA MANEJAR ERRORES (401, 403)

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response &&  error.response.status === 401) {
        //REDIRIGE EL LOGIN SI HA CADUCADO LA SESION
        localStorage.removeItem('token');
        localStorage.removeItem('user');
         if(window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login';
         }
      }
      return Promise.reject(error);
    } 
  );

  export default api;