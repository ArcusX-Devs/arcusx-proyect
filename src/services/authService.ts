import axios from 'axios';
import { API_URL } from '../config/database';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Función para verificar si un token JWT ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true; // Si hay error al decodificar, considerar como expirado
  }
};

export const authService = {
  async login(data: LoginData) {
    try {
      const response = await axios.post(`${API_URL}/auth/login.php`, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(data: RegisterData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register.php`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    
    // Verificar si el token ha expirado
    if (isTokenExpired(token)) {
      // Si el token ha expirado, limpiar localStorage
      this.logout();
      return false;
    }
    
    return true;
  },

  getToken() {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      this.logout();
      return null;
    }
    return token;
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}; 