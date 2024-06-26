import React, { useState, useEffect } from 'react';
import axios from '../../Api/Axiosconfig';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import '../../assets/css/Agendamientos.css'; // Ajusta la ruta según la estructura de tu proyecto

const Agendamientos = () => {
    const [agendamientos, setAgendamientos] = useState([]);
    const [mensajeNuevoAgendamiento, setMensajeNuevoAgendamiento] = useState('');

    useEffect(() => {
        fetchAgendamientos();
    }, []);

    const fetchAgendamientos = async () => {
        try {
            const response = await axios.get('/Agendamiento');
            setAgendamientos(response.data.agendamientos);
        } catch (error) {
            console.error('Error fetching agendamientos:', error);
        }
    };

    useEffect(() => {
        const eventSource = new EventSource('/stream-agendamientos'); // Ajusta la URL del evento de servidor si lo tienes
        eventSource.onmessage = (event) => {
            const newAgendamiento = JSON.parse(event.data);
            setMensajeNuevoAgendamiento(`¡Nuevo agendamiento creado! ID: ${newAgendamiento.id}`);
            fetchAgendamientos(); // Actualiza la lista de agendamientos al recibir un nuevo agendamiento
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className="agendamientos-container">
            <div className="agendamientos-list-container">
                <h2>Listado de Agendamientos</h2>
                <p className="agendamientos-info">
                    Querido cliente, en esta parte está el agendamiento de muchos clientes. Debe tener en cuenta que el último agendamiento en la parte final es el suyo. Si es posible, recuerde su ID y el del empleado. Estaremos realizando próximas mejoras.
                </p>
                {mensajeNuevoAgendamiento && (
                    <div className="mensaje-agendamiento">
                        {mensajeNuevoAgendamiento}
                    </div>
                )}
                <ul className="agendamientos-list">
                    {agendamientos.map((agendamiento) => (
                        <li key={agendamiento.id} className="agendamiento-item">
                            <strong>ID del Agendamiento:</strong> {agendamiento.id} <br />
                            <strong>Cliente ID:</strong> {agendamiento.cliente_id} <br />
                            <strong>Empleado ID:</strong> {agendamiento.empleado_id} <br />
                            <strong>Fecha y Hora:</strong> {agendamiento.fecha_hora} <br />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="logout-button">
                <Link to="/login" className="btn-logout">Cerrar Sesión</Link>
            </div>
        </div>
    );
};

export default Agendamientos;
