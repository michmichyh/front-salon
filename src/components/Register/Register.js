import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Api/Axiosconfig'; // Importa la configuración de Axios
import '../../assets/css/Register.css'; // Importar el archivo CSS para los estilos

function Register() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/Clientes', {
        nombre: nombre,
        telefono: telefono,
        email: email,
        direccion: direccion,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      console.log('Client registered successfully:', response.data);
      // Aquí podrías redirigir a otra página o realizar acciones adicionales después del registro
    } catch (error) {
      const errorMessage = error.response?.data ?? 'An unexpected error occurred';
      console.error('Error registering client:', errorMessage);
      // Aquí podrías mostrar el mensaje de error en la UI
      alert(`Error registering client: ${JSON.stringify(errorMessage)}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            value={telefono}
            onChange={handleTelefonoChange}
          />
        </div>
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
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={handleDireccionChange}
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
        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
