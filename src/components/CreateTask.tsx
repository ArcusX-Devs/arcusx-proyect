import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../css/CreateTask.css'; // Necesitas crear este archivo CSS
import axios from 'axios'; // Importar axios
import { API_URL } from '../config/database'; // Importar API_URL

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USDC', // Moneda por defecto
    difficulty: 'Fácil', // Campo de dificultad
    category: 'Desarrollo', // Campo de categoría por defecto
    subtitle: '' // Nuevo campo de subtítulo
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Obtener el usuario logeado para obtener su ID
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    // Validar que el usuario está logeado antes de crear la tarea
    if (!user || !user.id) {
        setError('Debes estar logeado para crear una tarea.');
        setLoading(false);
        return;
    }

    try {
      // Enviar los datos de la tarea a tu API PHP, incluyendo el user_id
      const response = await axios.post(`${API_URL}/auth/create_task.php`, {
          ...formData,
          user_id: user.id // Añadir el ID del usuario logeado
      });

      if (response.data && response.data.message) {
        setMessage(response.data.message); // Mostrar mensaje de éxito de la API
        setFormData({ // Limpiar formulario
          title: '',
          description: '',
          price: '',
          currency: 'USDC',
          difficulty: 'Fácil',
          category: 'Desarrollo',
          subtitle: ''
        });
        // Opcional: Redirigir al dashboard después de un pequeño retraso
        // setTimeout(() => {
        //   navigate('/dashboard');
        // }, 2000); // Redirigir después de 2 segundos

      } else {
         setError('Respuesta inesperada del servidor.');
      }

    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la tarea.'); // Mostrar error de la API o genérico
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-container">
      <Link to="/dashboard" className="back-button">
        <FaArrowLeft />
        <span>Volver al Dashboard</span>
      </Link>

      <div className="create-task-form-card">
        <h2>Crear Nueva Tarea</h2>
        {/* Mensajes de estado */}
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="create-task-form">
          {/* Campos del formulario (Título, Subtítulo, Descripción, Precio, Moneda) */}
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nuevo Campo de Subtítulo */}
          <div className="form-group">
            <label htmlFor="subtitle">Subtítulo (máx. 255 caracteres)</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              maxLength={255} // Limitar longitud según la base de datos
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio a Pagar</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="any"
            />
          </div>

          <div className="form-group">
            <label htmlFor="currency">Moneda</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <option value="USDC">USDC</option>
              <option value="ARCX">ARCX</option>
            </select>
          </div>

          {/* Campos de selección (Categoría, Dificultad) */}
           <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Desarrollo">Desarrollo</option>
              <option value="Diseño">Diseño</option>
              <option value="Marketing">Marketing</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Contenido">Contenido</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Dificultad</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value="Fácil">Fácil</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>

          {/* Botón de envío */}
          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Tarea'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;