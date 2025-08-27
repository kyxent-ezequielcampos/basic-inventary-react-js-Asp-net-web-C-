import React from 'react';
import { Table, Button, Badge, Alert } from 'react-bootstrap';

const CategoryTable = ({ 
  categories, 
  loading, 
  error, 
  onEdit, 
  onDelete 
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

  if (!categories || categories.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>No hay categorías</Alert.Heading>
        <p>No se han encontrado categorías. ¡Crea la primera!</p>
      </Alert>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Subcategorías</th>
          <th>Estado</th>
          <th>Fecha Creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>
              <strong>{category.nombre}</strong>
            </td>
            <td>
              {category.descripcion ? (
                <span className="text-muted">
                  {category.descripcion.length > 50
                    ? `${category.descripcion.substring(0, 50)}...`
                    : category.descripcion}
                </span>
              ) : (
                <span className="text-muted fst-italic">Sin descripción</span>
              )}
            </td>
            <td>
              <Badge bg="info" className="fs-6">
                {category.cantidadSubcategorias}
              </Badge>
            </td>
            <td>
              <Badge bg={category.activo ? "success" : "danger"}>
                {category.activo ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            <td>
              {new Date(category.fechaCreacion).toLocaleDateString('es-ES')}
            </td>
            <td>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(category)}
                  title="Editar"
                >
                  ✏️
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(category.id)}
                  title="Eliminar"
                  disabled={category.cantidadSubcategorias > 0}
                >
                  🗑️
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable; 