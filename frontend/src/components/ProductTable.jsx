import React from 'react';
import { Table, Button, Badge, Alert, InputGroup, Form } from 'react-bootstrap';

const ProductTable = ({ 
  products, 
  loading, 
  error, 
  onEdit, 
  onDelete,
  searchCode,
  onSearchCode,
  onClearSearch
}) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>No hay productos</Alert.Heading>
        <p>No se han encontrado productos. ¡Crea el primero!</p>
      </Alert>
    );
  }

  return (
    <>
      {/* Barra de búsqueda */}
      <div className="mb-3">
        <InputGroup>
          <Form.Control
            placeholder="Buscar por código..."
            value={searchCode}
            onChange={(e) => onSearchCode(e.target.value)}
          />
          <Button 
            variant="outline-secondary" 
            onClick={onClearSearch}
            disabled={!searchCode}
          >
            Limpiar
          </Button>
        </InputGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Código</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Subcategoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <strong>{product.nombre}</strong>
              </td>
              <td>
                {product.descripcion ? (
                  <span className="text-muted">
                    {product.descripcion.length > 50
                      ? `${product.descripcion.substring(0, 50)}...`
                      : product.descripcion}
                  </span>
                ) : (
                  <span className="text-muted fst-italic">Sin descripción</span>
                )}
              </td>
              <td>
                <Badge bg="success" className="fs-6">
                  ${product.precio.toFixed(2)}
                </Badge>
              </td>
              <td>
                <Badge bg={product.stock > 0 ? "info" : "warning"} className="fs-6">
                  {product.stock}
                </Badge>
              </td>
              <td>
                {product.codigo ? (
                  <code className="bg-light px-2 py-1 rounded">
                    {product.codigo}
                  </code>
                ) : (
                  <span className="text-muted fst-italic">Sin código</span>
                )}
              </td>
              <td>
                {product.marca || (
                  <span className="text-muted fst-italic">Sin marca</span>
                )}
              </td>
              <td>
                <Badge bg="primary" className="fs-6">
                  {product.categoriaNombre}
                </Badge>
              </td>
              <td>
                <Badge bg="secondary" className="fs-6">
                  {product.subcategoriaNombre}
                </Badge>
              </td>
              <td>
                <Badge bg={product.activo ? "success" : "danger"}>
                  {product.activo ? "Activo" : "Inactivo"}
                </Badge>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(product)}
                    title="Editar"
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductTable; 