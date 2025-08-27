import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useSubCategories } from '../hooks/useSubCategories';
import { useCategories } from '../hooks/useCategories';
import SubCategoryTable from '../components/SubCategoryTable';
import SubCategoryForm from '../components/SubCategoryForm';

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
    } catch (err) {
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
    } catch (err) {
      // El error ya se maneja en el hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubCategory(id);
      setDeleteConfirm(null);
    } catch (err) {
      // El error ya se maneja en el hook
    }
  };

  const handleFormSubmit = editingSubCategory ? handleUpdate : handleCreate;

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSubCategory(null);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>📁 Gestión de Subcategorías</h1>
          <p className="text-muted">
            Administra las subcategorías dentro de cada categoría principal
          </p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button 
            variant="success" 
            size="lg"
            onClick={() => setShowForm(true)}
            disabled={categories.length === 0}
          >
            ➕ Nueva Subcategoría
          </Button>
        </Col>
      </Row>

      {categories.length === 0 && (
        <Alert variant="warning">
          <Alert.Heading>⚠️ No hay categorías disponibles</Alert.Heading>
          <p>
            Debes crear al menos una categoría antes de poder crear subcategorías.
            <br />
            <Button 
              variant="outline-warning" 
              size="sm" 
              className="mt-2"
              href="/categorias"
            >
              Ir a Categorías
            </Button>
          </p>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      <SubCategoryTable
        subCategories={subCategories}
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
            ¿Estás seguro de que quieres eliminar esta subcategoría? 
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