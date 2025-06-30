import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../css/Login.css';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  // Verificar si el usuario ya está autenticado al cargar el componente
  useEffect(() => {
    if (isAuthenticated) {
      // Si ya está autenticado, redirigir al dashboard
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (!email || !password) {
        setError('Por favor, completa todos los campos');
        return;
      }

      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isAuthenticated === null) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">ArcusX</div>
            <h2>Verificando sesión...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <Link to="/" className="back-button">
        <FaArrowLeft />
        <span>Volver</span>
      </Link>
      
      <div className="login-card">
        <div className="login-header">
          <Link to="/" className="login-logo">
            ArcusX
          </Link>
          <h2>Iniciar Sesión</h2>
          <p>Accede a tu cuenta para comenzar a ganar</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email"> <h4> Correo Electrónico </h4> </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password"> <h4> Contraseña </h4> </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Recordarme</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="register-link">
              Regístrate
            </Link>
          </p>

      
        </div>
      </div>
    </div>
  );
};

export default Login; 