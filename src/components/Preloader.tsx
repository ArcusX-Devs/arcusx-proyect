import React, { useEffect, useState } from 'react';
import '../css/Preloader.css';
import logo from '../images/arcus-logo.png';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos de carga

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="logo">
          <img src={logo} alt="ArcusX Logo" className="logo-image" />
        </div>
        <div className="loading-circle">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader; 