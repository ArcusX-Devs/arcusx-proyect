import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import '../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de registro
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="register-container">
      <Link to="/" className="back-button">
        <FaArrowLeft />
        <span>Volver</span>
      </Link>

      <div className="register-content">
        <div className="register-left">
          <div className="register-info">
            <h1>Únete a ArcusX</h1>
            <p>Comienza tu viaje en el mundo Web3</p>
            <div className="register-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🚀</span>
                <span>Accede a microtareas</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💎</span>
                <span>Gana en crypto</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🌎</span>
                <span>Conecta globalmente</span>
              </div>
            </div>
          </div>
        </div>
        <div className="register-right">
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Crear Cuenta</h2>
            <div className="form-group">
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <div className="input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="register-button">
              Registrarse
            </button>
            <p className="login-link">
              ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 