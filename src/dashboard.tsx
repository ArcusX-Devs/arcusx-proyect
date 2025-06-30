import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTasks, FaWallet, FaChartLine, FaBell, FaCog, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import './css/dashboard.css';
import arcusLogo from './images/arcus-logo.png';
import axios from 'axios';
import { API_URL } from './config/database';
import React from 'react';
import { useAuth } from './hooks/useAuth';

interface UserData {
  id: number;
  username: string;
  email: string;
  // Agrega otros campos del usuario si existen en tu objeto de usuario
}

interface TaskData {
  id: number;
  title: string;
  description: string;
  price: string;
  currency: string;
  difficulty: string;
  category: string;
  creator_username: string; // Nombre del usuario que creó la tarea
  created_at: string;
  subtitle: string;
  status: string; // Añadir el estado de la tarea
  proposal_count?: number; // Añadir campo para el conteo de propuestas (opcional inicialmente)
  has_accepted_proposal?: boolean; // **Añadido de nuevo**
  accepted_applicant_id?: number | null; // **Añadido de nuevo**
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [fetchedTasks, setFetchedTasks] = useState<TaskData[]>([]); // Estado para las tareas de la API
  const [loadingTasks, setLoadingTasks] = useState(true); // Estado de carga para las tareas
  const [tasksError, setTasksError] = useState<string>(''); // Estado de error al cargar tareas
  
  // Nuevo estado para las tareas del usuario
  const [userTasks, setUserTasks] = useState<TaskData[]>([]);
  const [loadingUserTasks, setLoadingUserTasks] = useState(true);
  const [userTasksError, setUserTasksError] = useState<string>('');
  
  // Nuevo estado para las tareas aceptadas por el usuario
  const [acceptedTasks, setAcceptedTasks] = useState<TaskData[]>([]);
  const [loadingAcceptedTasks, setLoadingAcceptedTasks] = useState(true);
  const [acceptedTasksError, setAcceptedTasksError] = useState<string>('');
  
  // Nuevo estado para tareas completadas
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  
  // Obtener usuario logeado desde localStorage
  const storedUser = localStorage.getItem('user');
  const user: UserData | null = storedUser ? JSON.parse(storedUser) : null;
  const [name, setName] = useState<string>(user?.username || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [saveError, setSaveError] = useState<string>('');
  
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const userData = {
    name: name,
    level: 0,
    experience: 75,
    tasksCompleted: completedTasksCount,
    tasksAvailable: 60,
    notifications: 3,
    totalEarnings: 0
  };
  
  // Historial de transacciones de ejemplo
  const transactions: any[] = [];
  // Calcular ganancias totales
  const totalEarnings = 0;
  
  // Función para filtrar tareas disponibles (excluye asignadas y aplica filtros de UI)
  const filteredTasks = fetchedTasks
    .filter(task => task.status !== 'assigned') // Excluir tareas asignadas
    .filter(task => categoryFilter === 'all' || task.category.toLowerCase() === categoryFilter.toLowerCase())
    .filter(task => difficultyFilter === 'all' || task.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
  
  // Estadísticas de ejemplo
  const stats = [
    { id: 1, title: 'Tareas Completadas', value: userData.tasksCompleted, icon: <FaTasks /> },
    { id: 2, title: 'Tareas Disponibles', value: filteredTasks.length, icon: <FaTasks /> },
    { id: 3, title: 'Ganancias Totales', value: `$${totalEarnings.toFixed(2)}`, icon: <FaWallet /> },
    { id: 4, title: 'Nivel', value: userData.level, icon: <FaChartLine /> }
  ];
  
  // --- Lógica para obtener tareas desde la API --- //
  useEffect(() => {
    if (activeTab === 'tasks') { // Cargar tareas solo cuando la pestaña 'tasks' está activa
      const fetchTasks = async () => {
        setLoadingTasks(true);
        setTasksError('');
        try {
          const response = await axios.get(`${API_URL}/auth/get_tasks.php`);
          if (Array.isArray(response.data)) {
            setFetchedTasks(response.data); // Guardar las tareas en el estado
          } else {
            setTasksError('Formato de datos de tareas inesperado.');
            setFetchedTasks([]); // Limpiar tareas si el formato es incorrecto
          }
        } catch (error: any) {
          setTasksError('Error al cargar las tareas: ' + (error.response?.data?.message || error.message));
          setFetchedTasks([]);
        } finally {
          setLoadingTasks(false);
        }
      };

      fetchTasks();
    }
  }, [activeTab]); // Ejecutar este efecto cuando cambie la pestaña activa
  // -------------------------------------------- //

  // --- Lógica para obtener el conteo de tareas completadas desde la API --- //
  useEffect(() => {
    if (user?.id) { // Solo cargar si el usuario está logeado
      const fetchCompletedTasksCount = async () => {
        try {
          const token = localStorage.getItem('token'); // Asume que el token se guarda aquí
          if (!token) {
            return;
          }

          const response = await axios.get(`${API_URL}/auth/get_completed_tasks_count.php`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.data && response.data.success) {
            setCompletedTasksCount(response.data.completed_tasks_count);
          }
        } catch (error: any) {
          console.error('Error al cargar el recuento de tareas completadas:', error);
        }
      };

      fetchCompletedTasksCount();
    }
  }, [user?.id]); // Ejecutar este efecto cuando el user.id cambie (es decir, al logearse)
  // -------------------------------------------- //

  // --- Lógica para obtener tareas del usuario desde la API --- //
  useEffect(() => {
    if (activeTab === 'manage-tasks' && user?.id) { // Cargar tareas del usuario solo cuando la pestaña 'manage-tasks' está activa y el usuario está logeado
      const fetchUserTasks = async () => {
        setLoadingUserTasks(true);
        setUserTasksError('');
        try {
          const response = await axios.get(`${API_URL}/auth/get_user_tasks.php?user_id=${user.id}`);
          if (Array.isArray(response.data)) {
            setUserTasks(response.data); // Guardar las tareas del usuario en el estado
          } else {
            setUserTasksError('Formato de datos de tareas del usuario inesperado.');
            setUserTasks([]); // Limpiar tareas si el formato es incorrecto
          }
        } catch (error: any) {
          setUserTasksError('Error al cargar las tareas del usuario: ' + (error.response?.data?.message || error.message));
          setUserTasks([]);
        } finally {
          setLoadingUserTasks(false);
        }
      };

      fetchUserTasks();
    }
  }, [activeTab, user?.id]); // Ejecutar este efecto cuando cambie la pestaña activa o el user.id
  // -------------------------------------------- //

  // --- Lógica para obtener tareas aceptadas por el usuario desde la API --- //
  useEffect(() => {
    console.log('DEBUG: Running fetchAcceptedTasks effect', { activeTab: activeTab, userId: user?.id });
    if (activeTab === 'in-progress' && user?.id) { // Cargar tareas aceptadas solo cuando la pestaña 'in-progress' está activa y el usuario está logeado
      const fetchAcceptedTasks = async () => {
        setLoadingAcceptedTasks(true);
        setAcceptedTasksError('');
        try {
          // Llamada al nuevo script de backend
          const response = await axios.get(`${API_URL}/auth/get_accepted_tasks.php?user_id=${user.id}`);
          console.log('DEBUG: Response from get_accepted_tasks.php', response.data);
          if (Array.isArray(response.data)) {
            setAcceptedTasks(response.data); // Guardar las tareas aceptadas en el estado
            console.log("DEBUG: Tareas aceptadas cargadas:", response.data);
          } else {
            setAcceptedTasksError('Formato de datos de tareas aceptadas inesperado.');
            setAcceptedTasks([]); // Limpiar tareas si el formato es incorrecto
          }
        } catch (error: any) {
          setAcceptedTasksError('Error al cargar las tareas aceptadas: ' + (error.response?.data?.message || error.message));
          setAcceptedTasks([]);
        } finally {
          setLoadingAcceptedTasks(false);
        }
      };

      fetchAcceptedTasks();
    }
  }, [activeTab, user?.id]); // Ejecutar este efecto cuando cambie la pestaña activa o el user.id
  // -------------------------------------------- //
  
  // Función para guardar cambios de configuración
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage('');
    setSaveError('');
    setSaving(true);
    
    if (!user?.id) {
        setSaveError('Usuario no autenticado.');
        setSaving(false);
        return;
    }

    try {
      if (!name || !email) {
        setSaveError('El nombre y el correo electrónico son obligatorios.');
        setSaving(false);
        return;
      }
      if (newPassword && newPassword !== confirmPassword) {
        setSaveError('Las contraseñas nuevas no coinciden.');
        setSaving(false);
        return;
      }
      // Llamada a la API para actualizar datos
      const response = await axios.post(`${API_URL}/auth/update_user.php`, {
        id: user.id, // Usar user.id directamente ya que se validó arriba
        name,
        email,
        currentPassword,
        newPassword
      });
      // Actualizar localStorage si el nombre o email cambian
      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // También actualiza los estados locales si la API devuelve los nuevos datos
        setName(response.data.user.username || '');
        setEmail(response.data.user.email || '');
      }
      setSaveMessage('¡Datos actualizados correctamente!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) { // Especificar tipo 'any' para el error
      setSaveError(error.response?.data?.message || 'Error al guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };
  
  // Función para navegar a la página de creación de tarea
  const handleCreateTaskClick = () => {
    navigate('/create-task');
  };

  // Función para navegar a la página de aplicación de tarea
  const handleApplyTaskClick = (taskId: number) => {
    navigate(`/apply-task/${taskId}`);
  };
  
  // Función para navegar a la página de supervisión (nueva)
  const handleSuperviseTaskClick = (taskId: number, acceptedApplicantId: number | null | undefined) => {
      console.log('DEBUG: handleSuperviseTaskClick called', { taskId, acceptedApplicantId });
      // TODO: Define la ruta correcta a tu página de supervisión/comunicación
      // Asegúrate de pasar ambos IDs: el de la tarea y el del aplicante aceptado
      if (acceptedApplicantId) {
           console.log('DEBUG: Navigating to supervise-task', { taskId, acceptedApplicantId });
           navigate(`/supervise-task/${taskId}/${acceptedApplicantId}`);
      } else {
           // Manejar el caso (poco probable si has_accepted_proposal es true) donde no hay ID de aplicante aceptado
           console.error(`No se encontró el ID del aplicante aceptado para la tarea ${taskId}`);
           // Opcional: Mostrar un mensaje al usuario
           // alert('No se pudo encontrar al trabajador asignado para esta tarea.');
      }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <img src={arcusLogo} alt="Arcus" />
          </Link>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-info">
            <Link to="/dashboard" className="user-dashboard-link">
              <h3 style={{ color: "#fff", textDecoration: "underline", cursor: "pointer" }}>
                {userData.name}
              </h3>
            </Link>
            <div className="user-level">
              <span>Nivel {userData.level}</span>
              <div className="level-progress">
                <div 
                  className="level-progress-bar" 
                  style={{ width: `${userData.experience}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
              <FaTasks /> <span>Tareas</span>
            </li>
            <li className={activeTab === 'in-progress' ? 'active' : ''} onClick={() => setActiveTab('in-progress')}>
              <FaTasks /> <span>En Progreso</span>
            </li>
             <li className={activeTab === 'manage-tasks' ? 'active' : ''} onClick={() => setActiveTab('manage-tasks')}>
              <FaTasks />
              <span>Administrar Tareas</span>
            </li>
            <li className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}>
              <FaWallet /> <span>Billetera</span>
            </li>
            <li className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
              <FaChartLine /> <span>Estadísticas</span>
            </li>
            <li className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
              <FaBell /> <span>Notificaciones</span>
              {userData.notifications > 0 && (
                <span className="notification-badge">{userData.notifications}</span>
              )}
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              <FaCog /> <span>Configuración</span>
            </li>
           
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>
            {activeTab === 'tasks' && 'Tareas Disponibles'}
            {activeTab === 'wallet' && 'Mi Billetera'}
            {activeTab === 'stats' && 'Estadísticas'}
            {activeTab === 'notifications' && 'Notificaciones'}
            {activeTab === 'settings' && 'Configuración'}
            {activeTab === 'in-progress' && 'Tareas en Progreso'}
             {activeTab === 'manage-tasks' && 'Administrar Tareas'} {/* Añadir título para esta pestaña */}
          </h1>
          <div className="header-actions">
            <button 
              className="notification-button"
              onClick={() => setActiveTab('notifications')}
            >
              <FaBell />
              {userData.notifications > 0 && (
                <span className="notification-badge">{userData.notifications}</span>
              )}
            </button>
            <button 
              className="user-menu"
              onClick={() => setActiveTab('settings')}
            >
              <div className="user-avatar">
                {userData.name.charAt(0)}
              </div>
            </button>
          </div>
        </header>
        
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-cards">
            {stats.map(stat => (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="tasks-container">
              <div className="tasks-header">
                <h2>Tareas Disponibles</h2>
                <button 
                  className="filters-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                  aria-label="Toggle filters"
                >
                  <FiMenu />
                </button>
              </div>

              <div className={`filters-wrapper ${showFilters ? 'active' : ''}`}>
                <div className="filter-container">
                  <select
                    className="filter-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="desarrollo">Desarrollo</option>
                    <option value="diseño">Diseño</option>
                    <option value="marketing">Marketing</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="contenido">Contenido</option>
                  </select>

                  <select
                    className="filter-select"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option value="all">Todas las dificultades</option>
                    <option value="fácil">Fácil</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>
              </div>
              
              <div className="tasks-grid">
                {loadingTasks && <p>Cargando tareas...</p>}
                {tasksError && <p className="error-message">{tasksError}</p>}
                {!loadingTasks && !tasksError && filteredTasks.length === 0 && (
                  <p>No hay tareas disponibles en este momento o con los filtros aplicados.</p>
                )}
                {!loadingTasks && !tasksError && filteredTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <p className="task-description">{task.subtitle}</p>
                    <div className="task-details">
                      <div className="task-detail">
                        <span className="task-detail-label">Recompensa</span>
                        <span className="task-detail-value">{task.price} {task.currency}</span>
                      </div>
                      <div className="task-detail">
                        <span className="task-detail-label">Creador</span>
                        <span className="task-detail-value">{task.creator_username}</span>
                      </div>
                    </div>
                    <button className="task-button" onClick={() => handleApplyTaskClick(task.id)}>
                      Aplicar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div className="wallet-container">
              <div className="wallet-balance">
                <h2>Ganancias Totales</h2>
                <div className="balance-amount">${totalEarnings.toFixed(2)}</div>
                <p className="wallet-description">
                  Tus ganancias son transferidas directamente a tu wallet cuando se completan las tareas 
                  a través de nuestro smart contract de escrow.
                </p>
              </div>
              
              <div className="transactions-container">
                <h2>Historial de Ganancias</h2>
                <div className="transactions-table">
                  <div className="transactions-header">
                    <div className="transaction-cell">Fecha</div>
                    <div className="transaction-cell">Tarea</div>
                    <div className="transaction-cell">Cantidad</div>
                    <div className="transaction-cell">Estado</div>
                  </div>
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="transaction-row">
                      <div className="transaction-cell">{transaction.date}</div>
                      <div className="transaction-cell">{transaction.task}</div>
                      <div className="transaction-cell">${transaction.amount.toFixed(2)}</div>
                      <div className="transaction-cell">
                        <span className="transaction-status completed">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="stats-container">
              <div className="stats-overview">
                <h2>Resumen de Actividad</h2>
                <div className="stats-chart">
                  {/* Aquí iría un gráfico de actividad */}
                  <div className="placeholder-chart">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '50%' }}></div>
                    <div className="chart-bar" style={{ height: '30%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="stats-details">
                <h2>Detalles de Rendimiento</h2>
                <div className="stats-table">
                  <div className="stats-row">
                    <div className="stats-label">Tareas Completadas</div>
                    <div className="stats-value">{userData.tasksCompleted}</div>
                  </div>
                  <div className="stats-row">
                    <div className="stats-label">Tasa de Completitud</div>
                    <div className="stats-value">95%</div>
                  </div>
                  <div className="stats-row">
                    <div className="stats-label">Tiempo Promedio</div>
                    <div className="stats-value">25 min</div>
                  </div>
                  <div className="stats-row">
                    <div className="stats-label">Ganancias Totales</div>
                    <div className="stats-value">${totalEarnings.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="notifications-container">
              <div className="notifications-header">
              <h2>Notificaciones</h2>
                <div className="notifications-actions">
                  <button className="mark-all-read">
                    Marcar todo como leído
                  </button>
                </div>
                  </div>
              <div className="notifications-list">
                {/* Eliminé el array de notificaciones y referencias a notificaciones */}
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-container">
              <h2>Configuración de la Cuenta</h2>
              <form className="settings-form" onSubmit={handleSaveChanges}>
                <div className="settings-section">
                  <h3>Información Personal</h3>
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="settings-section">
                  <h3>Preferencias</h3>
                  <div className="form-group">
                    <label htmlFor="language">Idioma</label>
                    <select id="language">
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="notifications">Notificaciones</label>
                    <select id="notifications">
                      <option value="all">Todas</option>
                      <option value="important">Solo importantes</option>
                      <option value="none">Ninguna</option>
                    </select>
                  </div>
                </div>
                
                <div className="settings-section">
                  <h3>Seguridad</h3>
                  <div className="form-group">
                    <label htmlFor="current-password">Contraseña Actual</label>
                    <input
                      type="password"
                      id="current-password"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">Nueva Contraseña</label>
                    <input
                      type="password"
                      id="new-password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar Contraseña</label>
                    <input
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="settings-actions">
                  <button className="settings-button" type="submit" disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  {saveMessage && <div className="save-success">{saveMessage}</div>}
                  {saveError && <div className="save-error">{saveError}</div>}
                </div>
              </form>
            </div>
          )}
          
          {/* Tasks in Progress Tab */}
          {activeTab === 'in-progress' && (
            <div className="tasks-in-progress-container">
              <div className="section-header">
                <h2>Tareas en Progreso</h2>
                <select 
                  className="filter-dropdown"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">Todas las categorías</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Diseño">Diseño</option>
                  <option value="Desarrollo">Desarrollo</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              
              <div className="tasks-grid">
                {loadingAcceptedTasks && <p>Cargando tareas aceptadas...</p>}
                {acceptedTasksError && <p className="error-message">{acceptedTasksError}</p>}
                {!loadingAcceptedTasks && !acceptedTasksError && acceptedTasks.length === 0 && (
                  <p>No tienes tareas en progreso en este momento.</p>
                )}
                {!loadingAcceptedTasks && !acceptedTasksError && acceptedTasks.length > 0 && acceptedTasks
                  .filter(task => categoryFilter === 'all' || task.category.toLowerCase() === categoryFilter.toLowerCase())
                  .map(task => (
                    <div key={task.id} className="task-card">
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        {task.difficulty && (
                          <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
                          {task.difficulty}
                        </span>
                        )}
                      </div>
                      <p className="task-description">{task.subtitle}</p>
                      <div className="task-details">
                        {task.price && task.currency && (
                          <div className="task-detail">
                            <span className="task-detail-label">Recompensa</span>
                            <span className="task-detail-value">{task.price} {task.currency}</span>
                        </div>
                        )}
                        {task.creator_username && (
                          <div className="task-detail">
                            <span className="task-detail-label">Creador</span>
                            <span className="task-detail-value">{task.creator_username}</span>
                        </div>
                        )}
                      </div>
                      {/* Botón de acción para Tareas en Progreso (visible para el trabajador aceptado) */}
                       {/* Comprobamos si el usuario logueado es el trabajador aceptado para esta tarea */}
                       <button
                           className="task-button btn-primary" // Puedes usar una clase de botón existente o definir una nueva
                           onClick={() => {
                               console.log('DEBUG: Trabajar button clicked for task', task.id);
                               console.log('DEBUG: Task object for Trabajar button', task);
                               handleSuperviseTaskClick(task.id, task.accepted_applicant_id);
                           }}
                       >
                           Trabajar
                       </button>
                        </div>
                  ))}
                        </div>
            </div>
          )}
          
          {/* Nueva sección para Administrar Tareas */}
          {activeTab === 'manage-tasks' && (
            <div className="manage-tasks-container">
              <div className="section-header">
                <h2>Administrar Tareas Creadas</h2>
                <button className="create-task-button" onClick={handleCreateTaskClick}>
                  <FaPlus />
                  <h3>Crear Nueva Tarea</h3>
                </button>
              </div>
              {/* Aquí se listarán las tareas creadas por el usuario */}
              {loadingUserTasks && <p>Cargando tus tareas...</p>}
              {userTasksError && <p className="error-message">{userTasksError}</p>}
              {!loadingUserTasks && userTasks.length === 0 && !userTasksError && <p>No has creado ninguna tarea todavía.</p>}

              {!loadingUserTasks && userTasks.length > 0 && (
                <div className="user-tasks-list">
                  {userTasks.map(task => (
                    <div key={task.id} className="user-task-item">
                      <h3>{task.title}</h3>
                      <p>{task.subtitle}</p>
                      {/* Mostrar el número de propuestas */}
                      <div className="proposal-count">
                        Propuestas: {task.proposal_count !== undefined ? task.proposal_count : 'Cargando...'}
                      </div>
                      {/* Botones de acción (Editar, Ver Propuestas, etc.) - **Corregido** */}
                      <div className="task-actions">
                         {/* Lógica condicional para mostrar el botón "Supervisar" o "Ver Propuestas" */}
                         {task.has_accepted_proposal ? (
                             // Mostrar botón Supervisar si hay una propuesta aceptada
                             <button
                                 className="btn-primary" // O la clase que prefieras para este botón
                                 onClick={() => handleSuperviseTaskClick(task.id, task.accepted_applicant_id)}
                             >
                                 Supervisar
                             </button>
                         ) : (
                             // Mostrar botón Ver Propuestas si no hay propuestas aceptadas
                             <button
                                 className="btn-secondary"
                                 onClick={() => navigate(`/proposals/${task.id}`)}
                             >
                                 Ver Propuestas ({task.proposal_count !== undefined ? task.proposal_count : 0})
                             </button>
                         )}
                         {/* Botón de Editar Tarea (opcional, para más tarde) */}
                         {/* <button className="btn-secondary">Editar</button> */}
                      </div>
                    </div>
                  ))}
              </div>
              )}

            </div>
          )}
        </div>
        
        {/* Botón flotante para crear tarea (solo en la pestaña Tareas) */}
        {activeTab === 'tasks' && (
          <button className="create-task-button" onClick={handleCreateTaskClick}>
           <FaPlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

