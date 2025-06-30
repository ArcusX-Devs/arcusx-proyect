import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../config/database';
import '../css/ApplyTask.css'; // Necesitas crear este archivo CSS

interface TaskData {
  id: number;
  title: string;
  description: string;
  price: string;
  currency: string;
  difficulty: string;
  category: string;
  creator_username: string;
  created_at: string;
}

const ApplyTask = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Obtener el ID de la tarea de la URL
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para el formulario de aplicación
  const [applicationMessage, setApplicationMessage] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState(''); // Nuevo estado para el enlace a portafolio
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Obtener usuario logeado para el ID del aplicante
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Efecto para cargar los detalles de la tarea al montar el componente
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Crear este endpoint en el backend
        const response = await axios.get(`${API_URL}/auth/get_task_details.php?task_id=${taskId}`);
        if (response.data) {
          setTask(response.data);
        } else {
          setError('No se encontraron detalles para esta tarea.');
        }
      } catch (err: any) {
        setError('Error al cargar los detalles de la tarea: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    } else {
      setError('ID de tarea no proporcionado.');
      setLoading(false);
    }
  }, [taskId]); // Ejecutar efecto cuando cambie el taskId de la URL

  // Manejar el envío del formulario de aplicación
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitError('');
    setSubmitting(true);

    if (!user || !user.id) {
      setSubmitError('Debes estar logeado para aplicar a una tarea.');
      setSubmitting(false);
      return;
    }

    if (!task?.id) {
        setSubmitError('No se pudo obtener el ID de la tarea para aplicar.');
        setSubmitting(false);
        return;
    }

    try {
      // TODO: Crear este endpoint en el backend para procesar la aplicación
      const response = await axios.post(`${API_URL}/auth/apply_task.php`, {
        taskId: task.id,
        applicantId: user.id,
        message: applicationMessage,
        portfolioUrl: portfolioUrl // Añadir el nuevo campo
      });

      if (response.data && response.data.message) {
        setSubmitMessage(response.data.message);
        setApplicationMessage(''); // Limpiar mensaje después de enviar
        setPortfolioUrl(''); // Limpiar campo de portafolio
        // Opcional: Redirigir o deshabilitar el formulario
      } else {
        setSubmitError('Respuesta inesperada al enviar la aplicación.');
      }

    } catch (err: any) {
      setSubmitError(err.response?.data?.message || 'Error al enviar la aplicación.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="apply-task-container">Cargando detalles de la tarea...</div>;
  }

  if (error) {
    return <div className="apply-task-container error-message">Error: {error}</div>;
  }

  if (!task) {
      return <div className="apply-task-container">No se encontró la tarea.</div>;
  }

  return (
    <div className="apply-task-container">
       <Link to="/dashboard" className="back-button">
         <FaArrowLeft />
         <span>Volver al Dashboard</span>
       </Link>

      <div className="apply-task-content">
        <div className="task-details-card">
          <h2>{task.title}</h2>
          <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
            {task.difficulty}
          </span>
          <p className="task-description-full">{task.description}</p>

          <div className="task-meta">
             <div className="meta-item">
               <span className="meta-label">Categoría:</span>
               <span className="meta-value">{task.category}</span>
             </div>
             <div className="meta-item">
               <span className="meta-label">Recompensa:</span>
               <span className="meta-value">{task.price} {task.currency}</span>
             </div>
             <div className="meta-item">
               <span className="meta-label">Creador:</span>
               <span className="meta-value">{task.creator_username}</span>
             </div>
             {/* Puedes añadir más detalles si los obtienes del backend */}
             {/* <div className="meta-item">
               <span className="meta-label">Publicada:</span>
               <span className="meta-value">{new Date(task.created_at).toLocaleDateString()}</span>
             </div> */}
          </div>
        </div>

        <div className="application-form-card">
          <h3>Aplicar a esta Tarea</h3>
           {submitMessage && <div className="success-message">{submitMessage}</div>}
           {submitError && <div className="error-message">{submitError}</div>}
          <form onSubmit={handleApplicationSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="applicationMessage">Tu Mensaje / Carta de Presentación</label>
              <textarea
                id="applicationMessage"
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                rows={6}
                required
              ></textarea>
            </div>
            {/* Nuevo campo para el enlace a portafolio */}
            <div className="form-group">
              <label htmlFor="portfolioUrl">Enlace a Portafolio o CV (Opcional)</label>
              <input
                type="url"
                id="portfolioUrl"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
              />
            </div>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Enviando Aplicación...' : 'Enviar Aplicación'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ApplyTask; 