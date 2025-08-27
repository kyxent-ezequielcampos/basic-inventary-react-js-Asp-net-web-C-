import React from 'react';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  Folder, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Zap, 
  Target,
  Plus,
  BarChart3
} from 'lucide-react';

const HomePage = () => {
  // Datos simulados para el dashboard
  const stats = {
    categorias: 5,
    subcategorias: 12,
    productos: 48,
    stockBajo: 3
  };

  const recentActivities = [
    { type: 'producto', action: 'creado', item: 'iPhone 15 Pro', time: '2 min ago' },
    { type: 'categoria', action: 'actualizada', item: 'Electrónicos', time: '15 min ago' },
    { type: 'subcategoria', action: 'creada', item: 'Smartwatches', time: '1 hora ago' },
    { type: 'producto', action: 'eliminado', item: 'Producto obsoleto', time: '2 horas ago' }
  ];

  return (
    <Container fluid>
      {/* Header del dashboard */}
      <Row className="mb-4">
        <Col>
          <div className="dashboard-header">
            <h1 className="display-5 fw-bold text-primary mb-2">
              <Target className="me-3" size={48} />
              Dashboard de Gestión
            </h1>
            <p className="lead text-muted mb-0">
              Bienvenido al panel de administración de tu sistema de inventario
            </p>
          </div>
        </Col>
      </Row>

      {/* Estadísticas principales */}
      <Row className="g-4 mb-5">
        <Col lg={3} md={6}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div 
                className="stat-icon mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <FolderOpen size={28} color="white" />
              </div>
              <h3 className="stat-number fw-bold text-primary mb-1">
                {stats.categorias}
              </h3>
              <p className="stat-label text-muted mb-2">Categorías</p>
              <Badge bg="primary" className="px-3 py-2">
                <TrendingUp size={12} className="me-1" />
                +2 este mes
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div 
                className="stat-icon mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <Folder size={28} color="white" />
              </div>
              <h3 className="stat-number fw-bold text-success mb-1">
                {stats.subcategorias}
              </h3>
              <p className="stat-label text-muted mb-2">Subcategorías</p>
              <Badge bg="success" className="px-3 py-2">
                <TrendingUp size={12} className="me-1" />
                +5 este mes
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div 
                className="stat-icon mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <Package size={28} color="white" />
              </div>
              <h3 className="stat-number fw-bold text-warning mb-1">
                {stats.productos}
              </h3>
              <p className="stat-label text-muted mb-2">Productos</p>
              <Badge bg="warning" className="px-3 py-2">
                <TrendingUp size={12} className="me-1" />
                +12 este mes
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="stat-card h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div 
                className="stat-icon mb-3"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <AlertTriangle size={28} color="white" />
              </div>
              <h3 className="stat-number fw-bold text-danger mb-1">
                {stats.stockBajo}
              </h3>
              <p className="stat-label text-muted mb-2">Stock Bajo</p>
              <Badge bg="danger" className="px-3 py-2">
                Requiere atención
              </Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Acciones rápidas */}
      <Row className="g-4 mb-5">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header 
              className="bg-primary text-white border-0"
              style={{ borderRadius: '15px 15px 0 0' }}
            >
              <h5 className="mb-0 fw-bold">
                <Zap className="me-2" size={20} />
                Acciones Rápidas
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col md={6}>
                  <Button 
                    as={Link} 
                    to="/categorias" 
                    variant="outline-primary"
                    size="lg"
                    className="w-100 p-3 d-flex align-items-center justify-content-center"
                    style={{ borderRadius: '12px', borderWidth: '2px' }}
                  >
                    <FolderOpen className="me-3" size={24} />
                    <div className="text-start">
                      <div className="fw-bold">Nueva Categoría</div>
                      <small className="text-muted">Crear categoría principal</small>
                    </div>
                  </Button>
                </Col>
                <Col md={6}>
                  <Button 
                    as={Link} 
                    to="/subcategorias" 
                    variant="outline-success"
                    size="lg"
                    className="w-100 p-3 d-flex align-items-center justify-content-center"
                    style={{ borderRadius: '12px', borderWidth: '2px' }}
                  >
                    <Folder className="me-3" size={24} />
                    <div className="text-start">
                      <div className="fw-bold">Nueva Subcategoría</div>
                      <small className="text-muted">Crear subcategoría</small>
                    </div>
                  </Button>
                </Col>
                <Col md={6}>
                  <Button 
                    as={Link} 
                    to="/productos" 
                    variant="outline-info"
                    size="lg"
                    className="w-100 p-3 d-flex align-items-center justify-content-center"
                    style={{ borderRadius: '12px', borderWidth: '2px' }}
                  >
                    <Package className="me-3" size={24} />
                    <div className="text-start">
                      <div className="fw-bold">Nuevo Producto</div>
                      <small className="text-muted">Agregar al inventario</small>
                    </div>
                  </Button>
                </Col>
                <Col md={6}>
                  <Button 
                    variant="outline-warning"
                    size="lg"
                    className="w-100 p-3 d-flex align-items-center justify-content-center"
                    style={{ borderRadius: '12px', borderWidth: '2px' }}
                  >
                    <BarChart3 className="me-3" size={24} />
                    <div className="text-start">
                      <div className="fw-bold">Reportes</div>
                      <small className="text-muted">Ver estadísticas</small>
                    </div>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header 
              className="bg-info text-white border-0"
              style={{ borderRadius: '15px 15px 0 0' }}
            >
              <h5 className="mb-0 fw-bold">
                <BarChart3 className="me-2" size={20} />
                Actividad Reciente
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="activity-item d-flex align-items-center mb-3 p-2 rounded"
                    style={{ backgroundColor: 'rgba(52, 152, 219, 0.05)' }}
                  >
                    <div 
                      className="activity-icon me-3"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: activity.type === 'producto' ? '#e74c3c' : 
                                       activity.type === 'categoria' ? '#3498db' : '#27ae60',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    >
                      {activity.type === 'producto' ? <Package size={16} color="white" /> : 
                       activity.type === 'categoria' ? <FolderOpen size={16} color="white" /> : 
                       <Folder size={16} color="white" />}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold" style={{ fontSize: '14px' }}>
                        {activity.item}
                      </div>
                      <small className="text-muted">
                        {activity.action} • {activity.time}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Características del sistema */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="text-center mb-4">
                <Zap className="me-2" size={32} />
                Características del Sistema
              </h4>
              <Row className="g-4">
                <Col md={3} className="text-center">
                  <div className="feature-icon mb-3">
                    <Shield size={48} color="#3498db" />
                  </div>
                  <h6 className="fw-bold">Seguro</h6>
                  <small className="text-muted">
                    Validaciones robustas y manejo de errores
                  </small>
                </Col>
                <Col md={3} className="text-center">
                  <div className="feature-icon mb-3">
                    <Smartphone size={48} color="#27ae60" />
                  </div>
                  <h6 className="fw-bold">Responsivo</h6>
                  <small className="text-muted">
                    Funciona en todos los dispositivos
                  </small>
                </Col>
                <Col md={3} className="text-center">
                  <div className="feature-icon mb-3">
                    <Zap size={48} color="#e67e22" />
                  </div>
                  <h6 className="fw-bold">Rápido</h6>
                  <small className="text-muted">
                    Interfaz optimizada y eficiente
                  </small>
                </Col>
                <Col md={3} className="text-center">
                  <div className="feature-icon mb-3">
                    <Target size={48} color="#9b59b6" />
                  </div>
                  <h6 className="fw-bold">Intuitivo</h6>
                  <small className="text-muted">
                    Fácil de usar y navegar
                  </small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage; 