import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaTasks, FaWallet, FaChartLine, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import './css/dashboard.css';
import arcusLogo from './images/arcus-logo.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Datos de ejemplo para el dashboard
  const userData = {
    name: 'Usuario Ejemplo',
    level: 3,
    experience: 75,
    tasksCompleted: 5,
    tasksAvailable: 60,
    notifications: 3,
    totalEarnings: 33.75
  };
  
  // Tareas de ejemplo
  const tasks = [
    {
      id: 1,
      title: 'Desarrollo de Smart Contract',
      description: 'Crear un contrato inteligente para gestionar tokens NFT con características especiales',
      reward: 0.015,
      currency: 'ETH',
      time: '2h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 2,
      title: 'Diseño de UI para DApp',
      description: 'Diseñar la interfaz de usuario para una aplicación descentralizada de finanzas',
      reward: 150,
      currency: 'XLM',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 3,
      title: 'Optimización de Smart Contracts',
      description: 'Optimizar el consumo de gas de contratos existentes',
      reward: 25,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 4,
      title: 'Creación de Contenido Web3',
      description: 'Escribir artículos explicativos sobre tecnología blockchain y DeFi',
      reward: 75,
      currency: 'XLM',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Contenido'
    },
    {
      id: 5,
      title: 'Testing de Contratos',
      description: 'Realizar pruebas exhaustivas de contratos inteligentes',
      reward: 20,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Blockchain'
    },
    {
      id: 6,
      title: 'Diseño de Logo NFT',
      description: 'Crear logos únicos para una colección de NFTs',
      reward: 0.01,
      currency: 'ETH',
      time: '2h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 7,
      title: 'Auditoría de Seguridad',
      description: 'Realizar auditoría de seguridad en contratos inteligentes',
      reward: 0.02,
      currency: 'ETH',
      time: '5h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 8,
      title: 'Marketing en Discord',
      description: 'Gestionar y moderar comunidad en Discord',
      reward: 15,
      currency: 'USDC',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Marketing'
    },
    {
      id: 9,
      title: 'Desarrollo Frontend Web3',
      description: 'Implementar conexión con wallets y contratos',
      reward: 0.012,
      currency: 'ETH',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Desarrollo'
    },
    {
      id: 10,
      title: 'Creación de Memes',
      description: 'Crear memes virales para redes sociales',
      reward: 50,
      currency: 'XLM',
      time: '1h',
      difficulty: 'Fácil',
      category: 'Marketing'
    },
    {
      id: 11,
      title: 'Documentación Técnica',
      description: 'Escribir documentación técnica para APIs blockchain',
      reward: 18,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Contenido'
    },
    {
      id: 12,
      title: 'Diseño de Banner',
      description: 'Crear banners para redes sociales y sitio web',
      reward: 80,
      currency: 'XLM',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Diseño'
    },
    {
      id: 13,
      title: 'Desarrollo de Token ERC20',
      description: 'Implementar token personalizado con características especiales',
      reward: 0.018,
      currency: 'ETH',
      time: '4h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 14,
      title: 'Gestión de Redes Sociales',
      description: 'Administrar perfiles en Twitter y LinkedIn',
      reward: 16,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    },
    {
      id: 15,
      title: 'Diseño de Whitepaper',
      description: 'Diseñar y maquetar whitepaper del proyecto',
      reward: 0.011,
      currency: 'ETH',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 16,
      title: 'Testing de DApp',
      description: 'Realizar pruebas de integración de la DApp',
      reward: 22,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Desarrollo'
    },
    {
      id: 17,
      title: 'Creación de Tutorial',
      description: 'Crear video tutorial sobre uso de la plataforma',
      reward: 120,
      currency: 'XLM',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Contenido'
    },
    {
      id: 18,
      title: 'Optimización de Gas',
      description: 'Optimizar costos de gas en transacciones',
      reward: 0.025,
      currency: 'ETH',
      time: '5h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 19,
      title: 'Diseño de UI Components',
      description: 'Crear biblioteca de componentes UI reutilizables',
      reward: 28,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 20,
      title: 'Community Management',
      description: 'Gestionar y hacer crecer la comunidad',
      reward: 100,
      currency: 'XLM',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Marketing'
    },
    {
      id: 21,
      title: 'Análisis de Smart Contracts',
      description: 'Realizar análisis de seguridad en contratos inteligentes existentes',
      reward: 0.02,
      currency: 'ETH',
      time: '4h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 22,
      title: 'Diseño de NFT Collection',
      description: 'Crear diseños únicos para una colección de 100 NFTs',
      reward: 0.025,
      currency: 'ETH',
      time: '5h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 23,
      title: 'Desarrollo de Bot de Trading',
      description: 'Implementar bot automatizado para trading en DEX',
      reward: 0.03,
      currency: 'ETH',
      time: '6h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 24,
      title: 'Creación de Stickers',
      description: 'Diseñar pack de stickers para Telegram/Discord',
      reward: 40,
      currency: 'USDC',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Diseño'
    },
    {
      id: 25,
      title: 'Gestión de Comunidad Discord',
      description: 'Moderar y gestionar comunidad de 1000+ miembros',
      reward: 35,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    },
    {
      id: 26,
      title: 'Desarrollo de Dapp Gaming',
      description: 'Crear juego simple basado en blockchain',
      reward: 0.04,
      currency: 'ETH',
      time: '8h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 27,
      title: 'Diseño de Emotes',
      description: 'Crear set de emotes personalizados para Discord',
      reward: 45,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 28,
      title: 'Traducción de Documentación',
      description: 'Traducir documentación técnica a español',
      reward: 50,
      currency: 'XLM',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Contenido'
    },
    {
      id: 29,
      title: 'Desarrollo de Marketplace NFT',
      description: 'Implementar marketplace para trading de NFTs',
      reward: 0.05,
      currency: 'ETH',
      time: '10h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 30,
      title: 'Creación de Thumbnails',
      description: 'Diseñar thumbnails para videos de YouTube',
      reward: 30,
      currency: 'USDC',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Diseño'
    },
    {
      id: 31,
      title: 'Optimización de Smart Contracts',
      description: 'Optimizar consumo de gas en DEX',
      reward: 0.035,
      currency: 'ETH',
      time: '6h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 32,
      title: 'Diseño de Interfaz de Wallet',
      description: 'Crear diseño UI/UX para wallet web3',
      reward: 0.02,
      currency: 'ETH',
      time: '5h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 33,
      title: 'Creación de Blog Posts',
      description: 'Escribir artículos sobre DeFi y Web3',
      reward: 40,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Contenido'
    },
    {
      id: 34,
      title: 'Desarrollo de Token Bridge',
      description: 'Implementar puente entre dos blockchains',
      reward: 0.06,
      currency: 'ETH',
      time: '12h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 35,
      title: 'Diseño de Presentación',
      description: 'Crear slides para pitch deck',
      reward: 55,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 36,
      title: 'Community Management Twitter',
      description: 'Gestionar cuenta de Twitter del proyecto',
      reward: 45,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    },
    {
      id: 37,
      title: 'Desarrollo de Staking Contract',
      description: 'Implementar contrato de staking con rewards',
      reward: 0.04,
      currency: 'ETH',
      time: '8h',
      difficulty: 'Difícil',
      category: 'Blockchain'
    },
    {
      id: 38,
      title: 'Diseño de Landing Page',
      description: 'Crear diseño para página principal',
      reward: 0.025,
      currency: 'ETH',
      time: '6h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 39,
      title: 'Creación de Video Tutorial',
      description: 'Producir video explicativo sobre el proyecto',
      reward: 60,
      currency: 'USDC',
      time: '5h',
      difficulty: 'Intermedio',
      category: 'Contenido'
    },
    {
      id: 40,
      title: 'Desarrollo de DAO',
      description: 'Implementar sistema de gobernanza DAO',
      reward: 0.07,
      currency: 'ETH',
      time: '15h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 41,
      title: 'Diseño de Iconos',
      description: 'Crear set de iconos para la plataforma',
      reward: 35,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 42,
      title: 'Marketing en LinkedIn',
      description: 'Gestionar presencia en LinkedIn',
      reward: 40,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    },
    {
      id: 43,
      title: 'Desarrollo de DEX',
      description: 'Implementar exchange descentralizado',
      reward: 0.08,
      currency: 'ETH',
      time: '20h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 44,
      title: 'Diseño de Correos',
      description: 'Crear templates para newsletter',
      reward: 30,
      currency: 'USDC',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Diseño'
    },
    {
      id: 45,
      title: 'Gestión de Telegram',
      description: 'Administrar grupo de Telegram',
      reward: 35,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    },
    {
      id: 46,
      title: 'Desarrollo de Lending Protocol',
      description: 'Implementar protocolo de préstamos DeFi',
      reward: 0.09,
      currency: 'ETH',
      time: '25h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 47,
      title: 'Diseño de Infografías',
      description: 'Crear infografías explicativas',
      reward: 40,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 48,
      title: 'Creación de Podcast',
      description: 'Producir episodio de podcast sobre Web3',
      reward: 65,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Contenido'
    },
    {
      id: 49,
      title: 'Desarrollo de Yield Farming',
      description: 'Implementar estrategias de yield farming',
      reward: 0.06,
      currency: 'ETH',
      time: '15h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 50,
      title: 'Diseño de App Móvil',
      description: 'Crear diseño para aplicación móvil',
      reward: 0.03,
      currency: 'ETH',
      time: '8h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 51,
      title: 'Marketing en Instagram',
      description: 'Gestionar cuenta de Instagram',
      reward: 45,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    },
    {
      id: 52,
      title: 'Desarrollo de NFT Marketplace',
      description: 'Crear marketplace especializado en NFTs',
      reward: 0.08,
      currency: 'ETH',
      time: '20h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 53,
      title: 'Diseño de Banners',
      description: 'Crear banners para redes sociales',
      reward: 35,
      currency: 'USDC',
      time: '2h',
      difficulty: 'Fácil',
      category: 'Diseño'
    },
    {
      id: 54,
      title: 'Gestión de Reddit',
      description: 'Moderar y gestionar subreddit',
      reward: 40,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    },
    {
      id: 55,
      title: 'Desarrollo de Oracle',
      description: 'Implementar oracle descentralizado',
      reward: 0.07,
      currency: 'ETH',
      time: '18h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 56,
      title: 'Diseño de Merchandise',
      description: 'Crear diseños para merchandising',
      reward: 50,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 57,
      title: 'Creación de Whitepaper',
      description: 'Escribir whitepaper técnico',
      reward: 0.05,
      currency: 'ETH',
      time: '10h',
      difficulty: 'Difícil',
      category: 'Contenido'
    },
    {
      id: 58,
      title: 'Desarrollo de Governance',
      description: 'Implementar sistema de votación on-chain',
      reward: 0.06,
      currency: 'ETH',
      time: '15h',
      difficulty: 'Difícil',
      category: 'Desarrollo'
    },
    {
      id: 59,
      title: 'Diseño de Avatares',
      description: 'Crear colección de avatares personalizados',
      reward: 45,
      currency: 'USDC',
      time: '3h',
      difficulty: 'Intermedio',
      category: 'Diseño'
    },
    {
      id: 60,
      title: 'Marketing en TikTok',
      description: 'Crear y gestionar contenido en TikTok',
      reward: 55,
      currency: 'USDC',
      time: '4h',
      difficulty: 'Intermedio',
      category: 'Marketing'
    }
  ];
  
  // Datos de ejemplo para tareas en progreso
  const tasksInProgress = [
    {
      id: 1,
      title: 'Desarrollo de Smart Contract',
      description: 'Crear un contrato inteligente para gestionar tokens NFT',
      reward: 0.015,
      currency: 'ETH',
      timeLeft: '1h 30m',
      progress: 65,
      deadline: '2024-03-20',
      category: 'Blockchain',
      difficulty: 'dificil'
    },
    {
      id: 2,
      title: 'Diseño de UI para DApp',
      description: 'Diseñar la interfaz de usuario para una aplicación descentralizada',
      reward: 150,
      currency: 'XLM',
      timeLeft: '2h 15m',
      progress: 40,
      deadline: '2024-03-21',
      category: 'Diseño',
      difficulty: 'media'
    }
  ];
  
  // Historial de transacciones de ejemplo
  const transactions = [
    { id: 1, type: 'Ingreso', amount: 8.25, date: '2023-04-05', task: 'Clasificación de imágenes', status: 'Completado' },
    { id: 2, type: 'Ingreso', amount: 7.50, date: '2023-04-04', task: 'Traducción de textos', status: 'Completado' },
    { id: 3, type: 'Ingreso', amount: 6.75, date: '2023-04-03', task: 'Etiquetado de datos', status: 'Completado' },
    { id: 4, type: 'Ingreso', amount: 5.25, date: '2023-04-02', task: 'Verificación de información', status: 'Completado' },
    { id: 5, type: 'Ingreso', amount: 6.00, date: '2023-04-01', task: 'Moderación de contenido', status: 'Completado' }
  ];
  
  // Calcular ganancias totales
  const totalEarnings = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  // Estadísticas de ejemplo
  const stats = [
    { id: 1, title: 'Tareas Completadas', value: userData.tasksCompleted, icon: <FaTasks /> },
    { id: 2, title: 'Tareas Disponibles', value: userData.tasksAvailable, icon: <FaTasks /> },
    { id: 3, title: 'Ganancias Totales', value: `$${totalEarnings.toFixed(2)}`, icon: <FaWallet /> },
    { id: 4, title: 'Nivel', value: userData.level, icon: <FaChartLine /> }
  ];
  
  // Datos de ejemplo para notificaciones
  const notifications = [
    {
      id: 1,
      type: 'task',
      title: 'Nueva tarea disponible',
      description: 'Se ha publicado una nueva tarea de Desarrollo de Smart Contract con una recompensa de 0.015 ETH.',
      time: 'Hace 2 horas',
      icon: <FaTasks />,
      unread: true
    },
    {
      id: 2,
      type: 'payment',
      title: 'Pago recibido',
      description: `Has recibido $${transactions[0].amount.toFixed(2)} por completar la tarea de ${transactions[0].task}.`,
      time: 'Hace 1 día',
      icon: <FaWallet />,
      unread: true
    },
    {
      id: 3,
      type: 'payment',
      title: 'Pago recibido',
      description: `Has recibido $${transactions[1].amount.toFixed(2)} por completar la tarea de ${transactions[1].task}.`,
      time: 'Hace 2 días',
      icon: <FaWallet />,
      unread: false
    },
    {
      id: 4,
      type: 'payment',
      title: 'Pago recibido',
      description: `Has recibido $${transactions[2].amount.toFixed(2)} por completar la tarea de ${transactions[2].task}.`,
      time: 'Hace 3 días',
      icon: <FaWallet />,
      unread: false
    },
    {
      id: 5,
      type: 'payment',
      title: 'Pago recibido',
      description: `Has recibido $${transactions[3].amount.toFixed(2)} por completar la tarea de ${transactions[3].task}.`,
      time: 'Hace 4 días',
      icon: <FaWallet />,
      unread: false
    },
    {
      id: 6,
      type: 'payment',
      title: 'Pago recibido',
      description: `Has recibido $${transactions[4].amount.toFixed(2)} por completar la tarea de ${transactions[4].task}.`,
      time: 'Hace 5 días',
      icon: <FaWallet />,
      unread: false
    }
  ];
  
  // Función para filtrar y ordenar tareas
  const filteredTasks = tasks
    .filter(task => categoryFilter === 'all' || task.category.toLowerCase() === categoryFilter.toLowerCase())
    .filter(task => difficultyFilter === 'all' || task.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
  
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
            <h3>{userData.name}</h3>
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
          <Link to="/" className="logout-button">
            <FaSignOutAlt /> <span>Cerrar Sesión</span>
          </Link>
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
          
          {/* Tasks Tab CODE OWNER: BRUNO MIRANDA*/}
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
                {filteredTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
                        {task.difficulty}
                      </span>
                    </div>
                    <p className="task-description">{task.description}</p>
                    <div className="task-details">
                      <div className="task-detail">
                        <span className="task-detail-label">Recompensa</span>
                        <span className="task-detail-value">{task.reward} {task.currency}</span>
                      </div>
                      <div className="task-detail">
                        <span className="task-detail-label">Tiempo</span>
                        <span className="task-detail-value">{task.time}</span>
                      </div>
                    </div>
                    <button className="task-button">Aplicar</button>
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
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.unread ? 'unread' : ''}`}
                  >
                    <div className="notification-header">
                      <h3>{notification.title}</h3>
                      <span className="notification-time">{notification.time}</span>
                  </div>
                    <p className="notification-description">{notification.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Settings Tab X_CODE OWNER: BRUNO MIRANDA*/}
          {activeTab === 'settings' && (
            <div className="settings-container">
              <h2>Configuración de la Cuenta</h2>
              <div className="settings-form">
                <div className="settings-section">
                  <h3>Información Personal</h3>
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" defaultValue={userData.name} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" defaultValue="usuario@ejemplo.com" />
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
                    <input type="password" id="current-password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">Nueva Contraseña</label>
                    <input type="password" id="new-password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar Contraseña</label>
                    <input type="password" id="confirm-password" />
                  </div>
                </div>
                
                <div className="settings-actions">
                  <button className="settings-button">Guardar Cambios</button>
                </div>
              </div>
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
              
              <div className="tasks-in-progress-grid">
                {tasksInProgress
                  .filter(task => categoryFilter === 'all' || task.category === categoryFilter)
                  .map(task => (
                    <div key={task.id} className="task-card-progress">
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        <span className={`difficulty-tag ${task.difficulty}`}>
                          {task.difficulty}
                        </span>
                      </div>
                      <p>{task.description}</p>
                      <div className="progress-section">
                        <div className="progress-info">
                          <span>Progreso</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="task-footer">
                        <div className="reward-info">
                          <span className="reward-amount">{task.reward}</span>
                          <span className="reward-currency">{task.currency}</span>
                        </div>
                        <div className="action-buttons">
                          <button className="btn-primary">Continuar</button>
                          <button className="btn-secondary">Entregar</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

