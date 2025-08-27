import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useSubCategories } from '../hooks/useSubCategories';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';

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
      } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      // El error ya se maneja en el hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
    } catch (err) {
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

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>📦 Gestión de Productos</h1>
          <p className="text-muted">
            Administra tu inventario de productos con información detallada
          </p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button 
            variant="success" 
            size="lg"
            onClick={() => setShowForm(true)}
            disabled={categories.length === 0 || subCategories.length === 0}
          >
            ➕ Nuevo Producto
          </Button>
        </Col>
      </Row>

      {(categories.length === 0 || subCategories.length === 0) && (
        <Alert variant="warning">
          <Alert.Heading>⚠️ Configuración incompleta</Alert.Heading>
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
                Ir a Categorías
              </Button>
              <Button 
                variant="outline-warning" 
                size="sm"
                href="/subcategorias"
              >
                Ir a Subcategorías
              </Button>
            </div>
          </p>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

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

      {/* Modal de confirmación de eliminación */}
      {deleteConfirm && (
        <Alert 
          variant="warning" 
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 1050, minWidth: '400px' }}
        >
          <Alert.Heading>Confirmar Eliminación</Alert.Heading>
          <p>
            ¿Estás seguro de que quieres eliminar este producto? 
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