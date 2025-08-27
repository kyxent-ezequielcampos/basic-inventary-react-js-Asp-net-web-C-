import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <Navbar text="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🏪 Gestión de Productos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={isActive('/')}
            >
              🏠 Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/categorias" 
              className={isActive('/categorias')}
            >
              📂 Categorías
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/subcategorias" 
              className={isActive('/subcategorias')}
            >
              📁 Subcategorías
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/productos" 
              className={isActive('/productos')}
            >
              📦 Productos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 