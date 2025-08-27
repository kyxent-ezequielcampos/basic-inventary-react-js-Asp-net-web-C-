import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useSubCategories } from '../hooks/useSubCategories';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import { 
  Package, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  FolderOpen, 
  Folder,
  BarChart3,
  Trash2,
  Search
} from 'lucide-react';

const ProductsPage = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    searchByCode
  } = useProducts();

  const { categories } = useCategories();
  const { subCategories } = useSubCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchCode, setSearchCode] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Manejar búsqueda por código
  const handleSearchCode = async (code) => {
    setSearchCode(code);
    if (code.trim()) {
      try {
        const result = await searchByCode(code);
        setSearchResults(result);
      } catch {
        setSearchResults(null);
      }
    } else {
      setSearchResults(null);
    }
  };

  const handleClearSearch = () => {
    setSearchCode('');
    setSearchResults(null);
  };

  const handleCreate = async (data) => {
    try {
      await createProduct(data);
      setShowForm(false);
    } catch {
      // El error ya se maneja en el hook
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleUpdate = async (data) => {
    try {
      await updateProduct(editingProduct.id, data);
      setShowForm(false);
      setEditingProduct(null);
    } catch {
      // El error ya se maneja en el hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
    } catch {
      // El error ya se maneja en el hook
    }
  };

  const handleFormSubmit = editingProduct ? handleUpdate : handleCreate;

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Mostrar productos filtrados o resultados de búsqueda
  const displayProducts = searchResults ? [searchResults] : products;

  // Calcular estadísticas
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.activo).length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  return (
    <Container fluid>
      {/* Header de la página */}
      <Row className="mb-4">
        <Col>
          <div className="page-header">
            <h1 className="display-6 fw-bold text-primary mb-2">
              <Package className="me-3" size={48} />
              Gestión de Productos
            </h1>
            <p className="lead text-muted mb-0">
              Administra tu inventario de productos con información detallada
            </p>
          </div>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button 
            variant="success" 
            size="lg"
            onClick={() => setShowForm(true)}
            disabled={categories.length === 0 || subCategories.length === 0}
            className="shadow-sm"
            style={{ borderRadius: '12px' }}
          >
            <Plus className="me-2" size={20} />
            Nuevo Producto
          </Button>
        </Col>
      </Row>

      {/* Estadísticas rápidas */}
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-3">
              <div 
                className="stat-icon mb-2"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <Package size={24} color="white" />
              </div>
              <h4 className="fw-bold text-primary mb-1">{totalProducts}</h4>
              <small className="text-muted">Total Productos</small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-3">
              <div 
                className="stat-icon mb-2"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <CheckCircle size={24} color="white" />
              </div>
              <h4 className="fw-bold text-success mb-1">{activeProducts}</h4>
              <small className="text-muted">Productos Activos</small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-3">
              <div 
                className="stat-icon mb-2"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <AlertTriangle size={24} color="white" />
              </div>
              <h4 className="fw-bold text-warning mb-1">{lowStockProducts}</h4>
              <small className="text-muted">Stock Bajo</small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-3">
              <div 
                className="stat-icon mb-2"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white',
                  margin: '0 auto'
                }}
              >
                <BarChart3 size={24} color="white" />
              </div>
              <h4 className="fw-bold text-info mb-1">
                {totalProducts > 0 ? Math.round((activeProducts / totalProducts) * 100) : 0}%
              </h4>
              <small className="text-muted">Tasa de Actividad</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {(categories.length === 0 || subCategories.length === 0) && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>
            <AlertTriangle className="me-2" size={20} />
            Configuración incompleta
          </Alert.Heading>
          <p>
            Para crear productos, necesitas tener al menos:
            <br />
            • Una categoría
            <br />
            • Una subcategoría
            <br />
            <div className="mt-2">
              <Button 
                variant="outline-warning" 
                size="sm" 
                className="me-2"
                href="/categorias"
              >
                <FolderOpen className="me-2" size={16} />
                Ir a Categorías
              </Button>
              <Button 
                variant="outline-warning" 
                size="sm"
                href="/subcategorias"
              >
                <Folder className="me-2" size={16} />
                Ir a Subcategorías
              </Button>
            </div>
          </p>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible className="mb-4">
          <Alert.Heading>
            <AlertTriangle className="me-2" size={20} />
            Error en el Sistema
          </Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      )}

      {/* Tabla de productos */}
      <Card className="border-0 shadow-sm">
        <Card.Header 
          className="bg-white border-0 py-3"
          style={{ borderRadius: '15px 15px 0 0' }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-dark">
              <BarChart3 className="me-2" size={20} />
              Lista de Productos
            </h5>
            <small className="text-muted">
              {totalProducts} producto{totalProducts !== 1 ? 's' : ''} encontrado{totalProducts !== 1 ? 's' : ''}
            </small>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <ProductTable
            products={displayProducts}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={(id) => setDeleteConfirm(id)}
            searchCode={searchCode}
            onSearchCode={handleSearchCode}
            onClearSearch={handleClearSearch}
          />
        </Card.Body>
      </Card>

      {/* Modal de confirmación de eliminación */}
      {deleteConfirm && (
        <Alert 
          variant="warning" 
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 1050, minWidth: '400px' }}
        >
          <Alert.Heading>
            <Trash2 className="me-2" size={20} />
            Confirmar Eliminación
          </Alert.Heading>
          <p>
            ¿Estás seguro de que quieres eliminar este producto? 
            Esta acción no se puede deshacer.
          </p>
          <div className="d-flex gap-2">
            <Button 
              variant="danger" 
              onClick={() => handleDelete(deleteConfirm)}
              style={{ borderRadius: '8px' }}
            >
              <Trash2 className="me-2" size={16} />
              Sí, Eliminar
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setDeleteConfirm(null)}
              style={{ borderRadius: '8px' }}
            >
              Cancelar
            </Button>
          </div>
        </Alert>
      )}

      {/* Modal del formulario */}
      <ProductForm
        show={showForm}
        onHide={handleCloseForm}
        onSubmit={handleFormSubmit}
        product={editingProduct}
        loading={loading}
        categories={categories}
        subCategories={subCategories}
      />
    </Container>
  );
};

export default ProductsPage; 