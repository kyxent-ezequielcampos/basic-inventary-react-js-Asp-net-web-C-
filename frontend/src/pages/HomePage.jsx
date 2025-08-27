import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4">🏪 Sistema de Gestión de Productos</h1>
            <p className="lead text-muted">
              Administra tu inventario de manera eficiente y organizada
            </p>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="display-4 mb-3">📂</div>
              <Card.Title>Categorías</Card.Title>
              <Card.Text>
                Organiza tus productos en categorías principales para una mejor clasificación
              </Card.Text>
              <Button 
                as={Link} 
                to="/categorias" 
                variant="outline-primary"
                size="lg"
              >
                Gestionar Categorías
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="display-4 mb-3">📁</div>
              <Card.Title>Subcategorías</Card.Title>
              <Card.Text>
                Crea subcategorías específicas dentro de cada categoría para mayor detalle
              </Card.Text>
              <Button 
                as={Link} 
                to="/subcategorias" 
                variant="outline-success"
                size="lg"
              >
                Gestionar Subcategorías
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="display-4 mb-3">📦</div>
              <Card.Title>Productos</Card.Title>
              <Card.Text>
                Administra tu inventario de productos con información detallada
              </Card.Text>
              <Button 
                as={Link} 
                to="/productos" 
                variant="outline-info"
                size="lg"
              >
                Gestionar Productos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

     
    </Container>
  );
};

export default HomePage; 