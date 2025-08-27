import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, Container } from 'react-bootstrap';
import { Home, FolderOpen, Folder, Package, Store } from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/',
      icon: <Home size={20} />,
      label: 'Inicio',
      description: 'Dashboard principal'
    },
    {
      path: '/categorias',
      icon: <FolderOpen size={20} />,
      label: 'Categorías',
      description: 'Gestionar categorías'
    },
    {
      path: '/subcategorias',
      icon: <Folder size={20} />,
      label: 'Subcategorías',
      description: 'Gestionar subcategorías'
    },
    {
      path: '/productos',
      icon: <Package size={20} />,
      label: 'Productos',
      description: 'Gestionar inventario'
    }
  ];

  return (
    <>
      {/* Overlay para cerrar sidebar en móvil */}
      {isOpen && (
        <div 
          className="sidebar-overlay d-lg-none" 
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040,
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '280px',
          backgroundColor: '#2c3e50',
          color: 'white',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOpen ? '2px 0 20px rgba(0,0,0,0.3)' : 'none',
          overflow: 'hidden'
        }}
      >
        {/* Header del sidebar */}
        <div 
          className="sidebar-header p-4"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)'
          }}
        >
          <div className="d-flex align-items-center">
            <div 
              className="sidebar-logo me-3"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}
            >
              <Store size={24} color="white" />
            </div>
            <div>
              <h5 className="mb-0" style={{ color: 'white', fontWeight: '600' }}>
                Gestión de Productos
              </h5>
              <small style={{ color: 'rgba(255,255,255,0.7)' }}>
                Sistema de Inventario
              </small>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <div className="sidebar-menu p-3" style={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}>
          <Nav className="flex-column">
            {menuItems.map((item, index) => (
              <Nav.Item key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`sidebar-link d-flex align-items-center p-3 rounded ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                  style={{
                    textDecoration: 'none',
                    color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.8)',
                    backgroundColor: isActive(item.path) 
                      ? 'rgba(52, 152, 219, 0.2)' 
                      : 'transparent',
                    border: isActive(item.path) 
                      ? '1px solid rgba(52, 152, 219, 0.3)' 
                      : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    animation: `slideInLeft ${0.1 * (index + 1)}s ease-out`
                  }}
                  onClick={() => {
                    // Cerrar sidebar en móvil al hacer clic
                    if (window.innerWidth < 992) {
                      onToggle();
                    }
                  }}
                >
                  <span 
                    className="sidebar-icon me-3"
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </span>
                  <div className="flex-grow-1">
                    <div 
                      className="sidebar-label"
                      style={{ 
                        fontWeight: isActive(item.path) ? '600' : '400',
                        fontSize: '16px'
                      }}
                    >
                      {item.label}
                    </div>
                    <div 
                      className="sidebar-description"
                      style={{ 
                        fontSize: '12px',
                        color: isActive(item.path) 
                          ? 'rgba(255,255,255,0.9)' 
                          : 'rgba(255,255,255,0.6)'
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                  {isActive(item.path) && (
                    <div 
                      className="sidebar-indicator"
                      style={{
                        width: '4px',
                        height: '20px',
                        backgroundColor: '#3498db',
                        borderRadius: '2px',
                        animation: 'slideInRight 0.3s ease-out'
                      }}
                    />
                  )}
                </Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* Footer del sidebar */}
        <div 
          className="sidebar-footer p-3"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.1)'
          }}
        >
          <div className="text-center">
            <small style={{ color: 'rgba(255,255,255,0.6)' }}>
              © 2025 Sistema de Gestión
            </small>
            <br />
            <small style={{ color: 'rgba(255,255,255,0.5)' }}>
              diseño insano
            </small>
          </div>
        </div>
      </div>

      {/* Estilos CSS inline para las animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(10px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar; 