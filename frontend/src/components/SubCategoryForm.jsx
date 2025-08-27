import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal } from 'react-bootstrap';

const SubCategoryForm = ({ 
  show, 
  onHide, 
  onSubmit, 
  subCategory = null, 
  loading = false,
  categories = []
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // Si hay una subcategoría para editar, llenar el formulario
  React.useEffect(() => {
    if (subCategory) {
      setValue('nombre', subCategory.nombre);
      setValue('descripcion', subCategory.descripcion);
      setValue('categoriaId', subCategory.categoriaId);
    } else {
      reset();
    }
  }, [subCategory, setValue, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!subCategory) {
      reset();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {subCategory ? 'Editar Subcategoría' : 'Nueva Subcategoría'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la subcategoría"
              {...register('nombre', { 
                required: 'El nombre es requerido',
                maxLength: {
                  value: 100,
                  message: 'El nombre no puede exceder 100 caracteres'
                }
              })}
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción (opcional)"
              {...register('descripcion', {
                maxLength: {
                  value: 500,
                  message: 'La descripción no puede exceder 500 caracteres'
                }
              })}
              isInvalid={!!errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría *</Form.Label>
            <Form.Select
              {...register('categoriaId', { 
                required: 'Debe seleccionar una categoría'
              })}
              isInvalid={!!errors.categoriaId}
            >
              <option value="">Seleccione una categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.categoriaId?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Guardando...' : (subCategory ? 'Actualizar' : 'Crear')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SubCategoryForm; 