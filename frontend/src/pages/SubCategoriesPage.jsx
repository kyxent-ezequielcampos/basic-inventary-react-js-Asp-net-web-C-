import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { useSubCategories } from '../hooks/useSubCategories';
import { useCategories } from '../hooks/useCategories';
import SubCategoryTable from '../components/SubCategoryTable';
import SubCategoryForm from '../components/SubCategoryForm';
import { 
  Folder, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Package, 
  BarChart3,
  Trash2,
  FolderOpen
} from 'lucide-react';

const SubCategoriesPage = () => {
  const {
    subCategories,
    loading,
    error,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
  } = useSubCategories();

  const { categories } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleCreate = async (data) => {
    try {
      await createSubCategory(data);
      setShowForm(false);
    } catch {
      // El error ya se maneja en el hook
    }
  };

  const handleEdit = (subCategory) => {
    setEditingSubCategory(subCategory);
    setShowForm(true);
  };

  const handleUpdate = async (data) => {
    try {
      await updateSubCategory(editingSubCategory.id, data);
      setShowForm(false);
      setEditingSubCategory(null);
    } catch {
      // El error ya se maneja en el hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubCategory(id);
      setDeleteConfirm(null);
    } catch {
      // El error ya se maneja en el hook
    }
  };

  const handleFormSubmit = editingSubCategory ? handleUpdate : handleCreate;

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSubCategory(null);
  };

  // Calcular estadísticas
  const totalSubCategories = subCategories.length;
  const activeSubCategories = subCategories.filter(sc => sc.activo).length;
  const totalProducts = subCategories.reduce((sum, sc) => sum + sc.cantidadProductos, 0);

  return (
    <Container fluid>
      {/* Header de la página */}
      <Row className="mb-4">
        <Col>
          <div className="page-header">
            <h1 className="display-6 fw-bold text-primary mb-2">
              <Folder className="me-3" size={48} />
              Gestión de Subcategorías
            </h1>
            <p className="lead text-muted mb-0">
              Administra las subcategorías dentro de cada categoría principal
            </p>
          </div>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button 
            variant="success" 
            size="lg"
            onClick={() => setShowForm(true)}
            disabled={categories.length === 0}
            className="shadow-sm"
            style={{ borderRadius: '12px' }}
          >
            <Plus className="me-2" size={20} />
            Nueva Subcategoría
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
                <Folder size={24} color="white" />
              </div>
              <h4 className="fw-bold text-primary mb-1">{totalSubCategories}</h4>
              <small className="text-muted">Total Subcategorías</small>
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
              <h4 className="fw-bold text-success mb-1">{activeSubCategories}</h4>
              <small className="text-muted">Subcategorías Activas</small>
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
                <Package size={24} color="white" />
              </div>
              <h4 className="fw-bold text-warning mb-1">{totalProducts}</h4>
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
                {totalSubCategories > 0 ? Math.round((activeSubCategories / totalSubCategories) * 100) : 0}%
              </h4>
              <small className="text-muted">Tasa de Actividad</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {categories.length === 0 && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>
            <AlertTriangle className="me-2" size={20} />
            No hay categorías disponibles
          </Alert.Heading>
          <p>
            Debes crear al menos una categoría antes de poder crear subcategorías.
            <br />
            <Button 
              variant="outline-warning" 
              size="sm" 
              className="mt-2"
              href="/categorias"
            >
              <FolderOpen className="me-2" size={16} />
              Ir a Categorías
            </Button>
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

      {/* Tabla de subcategorías */}
      <Card className="border-0 shadow-sm">
        <Card.Header 
          className="bg-white border-0 py-3"
          style={{ borderRadius: '15px 15px 0 0' }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-dark">
              <BarChart3 className="me-2" size={20} />
              Lista de Subcategorías
            </h5>
            <small className="text-muted">
              {totalSubCategories} subcategoría{totalSubCategories !== 1 ? 's' : ''} encontrada{totalSubCategories !== 1 ? 's' : ''}
            </small>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <SubCategoryTable
            subCategories={subCategories}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={(id) => setDeleteConfirm(id)}
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
            ¿Estás seguro de que quieres eliminar esta subcategoría? 
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
      <SubCategoryForm
        show={showForm}
        onHide={handleCloseForm}
        onSubmit={handleFormSubmit}
        subCategory={editingSubCategory}
        loading={loading}
        categories={categories}
      />
    </Container>
  );
};

export default SubCategoriesPage; 