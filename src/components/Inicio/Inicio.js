import React, { useState, useEffect } from 'react';
import axios from '../../Api/Axiosconfig';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import '../../assets/css/Inicio.css'; // Ajusta la ruta según la estructura de tu proyecto

function Inicio() {
  const [empleados, setEmpleados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState(''); // Estado para almacenar el ID del cliente
  const [empleadoId, setEmpleadoId] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

  useEffect(() => {
    // Obtener la lista de empleados al cargar el componente
    axios.get('/Empleado') // Ajusta la URL según tu API
      .then(response => {
        setEmpleados(response.data); // Suponiendo que response.data es un array de objetos empleados
        setLoading(false); // Marcar que la carga ha finalizado
      })
      .catch(error => {
        console.error('Error al obtener los empleados:', error);
        setLoading(false); // Marcar que la carga ha finalizado incluso si hay error
      });

    // Obtener la lista de clientes al cargar el componente
    axios.get('/Cliente') // Ajusta la URL según tu API
      .then(response => {
        setClientes(response.data); // Suponiendo que response.data es un array de objetos clientes
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const agendamiento = {
      cliente_id: clienteId, // Usamos el estado clienteId para el ID del cliente
      empleado_id: empleadoId,
      fecha_hora: fechaHora,
    };

    // Enviar la solicitud POST para registrar el agendamiento
    axios.post('/Agendamiento', agendamiento) // Ajusta la URL según tu API
      .then(response => {
        console.log('Agendamiento creado:', response.data);
        // Mostrar mensaje de alerta
        alert('¡El agendamiento se ha creado exitosamente!');
        // Redirigir a la página de Agendamientos
        window.location.href = '/Agendamientos'; // Ajusta la ruta según tu estructura de rutas
      })
      .catch(error => {
        console.error('Error al crear el agendamiento:', error);
      });
  };

  if (loading) {
    return <p>Cargando empleados...</p>;
  }

  return (
    <div className="Inicio-container">
      <h2>Bienvenido a Boutique-Mimi</h2>
      <p>Boutique-Mimi es un exclusivo salón de belleza ubicado en el corazón de la ciudad.</p>
      <p>Nos especializamos en ofrecer servicios de peluquería, estética y cuidado personal de alta calidad, diseñados para realzar la belleza natural de nuestros clientes.</p>

      <form onSubmit={handleSubmit} className="agendamiento-form">
        <div className="form-group">
          <label htmlFor="clienteId">Selecciona su nombre de ususario:</label>
          <select
            id="clienteId"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">Seleccione su nombre de cuenta</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="empleado">Selecciona un empleado:</label>
          <select
            id="empleado"
            value={empleadoId}
            onChange={(e) => setEmpleadoId(e.target.value)}
            required
          >
            <option value="">Selecciona un empleado</option>
            {empleados.map(empleado => (
              <option key={empleado.id} value={empleado.id}>{empleado.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fechaHora">Selecciona fecha y hora:</label>
          <input type="datetime-local" id="fechaHora" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} required />
        </div>
        <button type="submit">Agendar</button>
      </form>
      <p className="info-mensaje">
        Querido cliente, si desea ver su agendamiento es recomendable que recuerde El nombre de usuario con el cual se registro. Estaremos en próximas mejoras, Si no recuerda cual es su nombre de usuario, al Agendar una cita este lo va a redireccionar para Agendamiento y  el último Agendamiento es el suyo.
      </p>
      <div className="agendamiento-button">
        <Link to="/Agendamientos" className="btn-agendamiento">Ver Agendamientos</Link>
      </div>
    </div>
  );
}

export default Inicio;
