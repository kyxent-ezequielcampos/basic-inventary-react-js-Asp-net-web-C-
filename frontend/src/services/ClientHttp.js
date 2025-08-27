import axios from 'axios';

// Configuración base del cliente HTTP
const ClientHttp = axios.create({
  baseURL: 'http://localhost:5076/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para respuestas exitosas
ClientHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición HTTP:', error);
    
    // Manejo de errores específicos
    if (error.response) {
      // El servidor respondió con un código de estado de error
      console.error('Error del servidor:', error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo más causó el error
      console.error('Error en la configuración de la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default ClientHttp; 