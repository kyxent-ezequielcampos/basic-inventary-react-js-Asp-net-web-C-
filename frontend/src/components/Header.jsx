import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Menu, X, Bell, User, Store } from 'lucide-react';

const Header = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <header 
      className="main-header"
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1030,
        width: '100%'
      }}
    >
      <Container fluid>
        <Row className="align-items-center py-3">
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onToggleSidebar}
              className="sidebar-toggle"
              style={{
                border: '2px solid #e9ecef',
                backgroundColor: 'white',
                color: '#6c757d',
                fontSize: '18px',
                padding: '10px 12px',
                borderRadius: '10px',
                transition: 'all 0.2s ease',
                minWidth: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </Col>
          
          <Col className="d-none d-lg-block">
            <div className="d-flex align-items-center">
              <div 
                className="header-logo me-3"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: 'white'
                }}
              >
                <Store size={18} color="white" />
              </div>
              <div>
                <h5 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>
                  Sistema de Gestión de Productos
                </h5>
                <small style={{ color: '#6c757d' }}>
                  Panel de Administración
                </small>
              </div>
            </div>
          </Col>

          <Col xs="auto" className="ms-auto">
            <div className="d-flex align-items-center gap-3">
              {/* Notificaciones */}
              <Button
                variant="outline-primary"
                size="sm"
                className="position-relative"
                style={{
                  border: 'none',
                  backgroundColor: 'rgba(52, 152, 219, 0.1)',
                  color: '#3498db',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Bell size={16} />
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '10px' }}
                >
                  3
                </span>
              </Button>

              {/* Perfil del usuario */}
              <div className="d-flex align-items-center">
                <div 
                  className="user-avatar me-2"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  <User size={18} color="white" />
                </div>
                <div className="d-none d-md-block">
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#2c3e50' }}>
                    Administrador
                  </div>
                  <small style={{ color: '#6c757d' }}>
                    admin@sistema.com
                  </small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header; 