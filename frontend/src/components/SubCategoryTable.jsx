import React from 'react';
import { Table, Button, Badge, Alert } from 'react-bootstrap';

const SubCategoryTable = ({ 
  subCategories, 
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

  if (!subCategories || subCategories.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>No hay subcategorías</Alert.Heading>
        <p>No se han encontrado subcategorías. ¡Crea la primera!</p>
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
          <th>Categoría</th>
          <th>Productos</th>
          <th>Estado</th>
          <th>Fecha Creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {subCategories.map((subCategory) => (
          <tr key={subCategory.id}>
            <td>{subCategory.id}</td>
            <td>
              <strong>{subCategory.nombre}</strong>
            </td>
            <td>
              {subCategory.descripcion ? (
                <span className="text-muted">
                  {subCategory.descripcion.length > 50
                    ? `${subCategory.descripcion.substring(0, 50)}...`
                    : subCategory.descripcion}
                </span>
              ) : (
                <span className="text-muted fst-italic">Sin descripción</span>
              )}
            </td>
            <td>
              <Badge bg="primary" className="fs-6">
                {subCategory.categoriaNombre}
              </Badge>
            </td>
            <td>
              <Badge bg="info" className="fs-6">
                {subCategory.cantidadProductos}
              </Badge>
            </td>
            <td>
              <Badge bg={subCategory.activo ? "success" : "danger"}>
                {subCategory.activo ? "Activo" : "Inactivo"}
              </Badge>
            </td>
            <td>
              {new Date(subCategory.fechaCreacion).toLocaleDateString('es-ES')}
            </td>
            <td>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(subCategory)}
                  title="Editar"
                >
                  ✏️
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(subCategory.id)}
                  title="Eliminar"
                  disabled={subCategory.cantidadProductos > 0}
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

export default SubCategoryTable; 