import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './dashboard';
import Preloader from './components/Preloader';
import CreateTask from './components/CreateTask';
import ApplyTask from './components/ApplyTask';
import ProposalReview from './components/ProposalReview';
import SuperviseTask from './components/SuperviseTask';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="app">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Hero />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/apply-task/:taskId" element={<ApplyTask />} />
            <Route path="/proposals/:taskId" element={<ProposalReview />} />
            <Route path="/supervise-task/:taskId/:acceptedApplicantId" element={<SuperviseTask />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
