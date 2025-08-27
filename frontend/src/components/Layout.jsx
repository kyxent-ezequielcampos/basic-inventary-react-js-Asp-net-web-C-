import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detectar si es móvil y ajustar el sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 992;
      // En desktop, el sidebar puede estar abierto por defecto
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-wrapper">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      {/* Contenido principal */}
      <div 
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          width: isSidebarOpen ? 'calc(100vw - 280px)' : '100vw'
        }}
      >
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {/* Contenido de la página */}
        <main 
          className="page-content"
          style={{
            padding: '2rem',
            minHeight: 'calc(100vh - 80px)',
            width: '100%'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 