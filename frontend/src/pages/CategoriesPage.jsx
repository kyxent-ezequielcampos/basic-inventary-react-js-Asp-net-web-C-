import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useCategories } from '../hooks/useCategories';
import CategoryTable from '../components/CategoryTable';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleCreate = async (data) => {
    try {
      await createCategory(data);
      setShowForm(false);
    } catch (err) {
      // El error ya se maneja en el hook
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleUpdate = async (data) => {
    try {
      await updateCategory(editingCategory.id, data);
      setShowForm(false);
      setEditingCategory(null);
    } catch (err) {
      // El error ya se maneja en el hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setDeleteConfirm(null);
    } catch (err) {
      // El error ya se maneja en el hook
    }
  };

  const handleFormSubmit = editingCategory ? handleUpdate : handleCreate;

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>📂 Gestión de Categorías</h1>
          <p className="text-muted">
            Administra las categorías principales de productos
          </p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button 
            variant="success" 
            size="lg"
            onClick={() => setShowForm(true)}
          >
            ➕ Nueva Categoría
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      <CategoryTable
        categories={categories}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteConfirm(id)}
      />

      {/* Modal de confirmación de eliminación */}
      {deleteConfirm && (
        <Alert 
          variant="warning" 
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 1050, minWidth: '400px' }}
        >
          <Alert.Heading>Confirmar Eliminación</Alert.Heading>
          <p>
            ¿Estás seguro de que quieres eliminar esta categoría? 
            Esta acción no se puede deshacer.
          </p>
          <div className="d-flex gap-2">
            <Button 
              variant="danger" 
              onClick={() => handleDelete(deleteConfirm)}
            >
              Sí, Eliminar
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setDeleteConfirm(null)}
            >
              Cancelar
            </Button>
          </div>
        </Alert>
      )}

      {/* Modal del formulario */}
      <CategoryForm
        show={showForm}
        onHide={handleCloseForm}
        onSubmit={handleFormSubmit}
        category={editingCategory}
        loading={loading}
      />
    </Container>
  );
};

export default CategoriesPage; 