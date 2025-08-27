import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal } from 'react-bootstrap';

const CategoryForm = ({ 
  show, 
  onHide, 
  onSubmit, 
  category = null, 
  loading = false 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // Si hay una categoría para editar, llenar el formulario
  React.useEffect(() => {
    if (category) {
      setValue('nombre', category.nombre);
      setValue('descripcion', category.descripcion);
    } else {
      reset();
    }
  }, [category, setValue, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!category) {
      reset();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {category ? 'Editar Categoría' : 'Nueva Categoría'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la categoría"
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
            {loading ? 'Guardando...' : (category ? 'Actualizar' : 'Crear')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryForm; 