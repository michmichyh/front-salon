import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Api/Axiosconfig'; // Importa la configuración de Axios
import '../../assets/css/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success('Login exitoso');
        navigate('/Inicio');
      } else {
        setError('Error en las credenciales. Intenta nuevamente.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta:', error.response.data);
        if (error.response.status === 401) {
          setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
        } else {
          setError('Ocurrió un error. Intenta nuevamente más tarde.');
        }
      } else if (error.request) {
        console.error('Error en la solicitud:', error.request);
        setError('No se pudo conectar con el servidor. Intenta nuevamente más tarde.');
      } else {
        console.error('Error general:', error.message);
        setError('Ocurrió un error. Intenta nuevamente más tarde.');
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;