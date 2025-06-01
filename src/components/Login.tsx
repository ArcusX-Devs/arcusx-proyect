import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    // Aquí iría la lógica de autenticación real
    // Por ahora, simulamos un inicio de sesión exitoso
    if (email === 'test@test.cl' && password === '1234') {
      // Redirigir al dashboard después del inicio de sesión exitoso
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas');
    }
  };

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
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
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
          
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="register-link">
              Regístrate
            </Link>
          </p>

          <br></br>
          <p>User: test@test.cl | Pass: 1234</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 