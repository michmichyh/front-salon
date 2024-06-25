import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/Api/Clientes');
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.status);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Otro tipo de error
      console.error('Error:', error.message);
    }
  }
};
export default fetchData;