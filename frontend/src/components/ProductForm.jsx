import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

const ProductForm = ({ 
  show, 
  onHide, 
  onSubmit, 
  product = null, 
  loading = false,
  categories = [],
  subCategories = []
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();

  const selectedCategoryId = watch('categoriaId');

  // Filtrar subcategorías según la categoría seleccionada
  const filteredSubCategories = subCategories.filter(
    sub => !selectedCategoryId || sub.categoriaId === parseInt(selectedCategoryId)
  );

  // Si hay un producto para editar, llenar el formulario
  React.useEffect(() => {
    if (product) {
      setValue('nombre', product.nombre);
      setValue('descripcion', product.descripcion);
      setValue('precio', product.precio);
      setValue('stock', product.stock);
      setValue('codigo', product.codigo);
      setValue('marca', product.marca);
      setValue('categoriaId', product.subcategoriaId ? 
        subCategories.find(sc => sc.id === product.subcategoriaId)?.categoriaId : '');
      setValue('subcategoriaId', product.subcategoriaId);
    } else {
      reset();
    }
  }, [product, setValue, reset, subCategories]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!product) {
      reset();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? 'Editar Producto' : 'Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  {...register('nombre', { 
                    required: 'El nombre es requerido',
                    maxLength: {
                      value: 200,
                      message: 'El nombre no puede exceder 200 caracteres'
                    }
                  })}
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código único del producto"
                  {...register('codigo', {
                    maxLength: {
                      value: 50,
                      message: 'El código no puede exceder 50 caracteres'
                    }
                  })}
                  isInvalid={!!errors.codigo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.codigo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese una descripción del producto"
              {...register('descripcion', {
                maxLength: {
                  value: 1000,
                  message: 'La descripción no puede exceder 1000 caracteres'
                }
              })}
              isInvalid={!!errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Precio *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register('precio', { 
                    required: 'El precio es requerido',
                    min: {
                      value: 0,
                      message: 'El precio debe ser mayor o igual a 0'
                    }
                  })}
                  isInvalid={!!errors.precio}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.precio?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Stock *</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register('stock', { 
                    required: 'El stock es requerido',
                    min: {
                      value: 0,
                      message: 'El stock debe ser mayor o igual a 0'
                    }
                  })}
                  isInvalid={!!errors.stock}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.stock?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Marca del producto"
                  {...register('marca', {
                    maxLength: {
                      value: 100,
                      message: 'La marca no puede exceder 100 caracteres'
                    }
                  })}
                  isInvalid={!!errors.marca}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.marca?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Subcategoría *</Form.Label>
                <Form.Select
                  {...register('subcategoriaId', { 
                    required: 'Debe seleccionar una subcategoría'
                  })}
                  isInvalid={!!errors.subcategoriaId}
                  disabled={!selectedCategoryId}
                >
                  <option value="">
                    {selectedCategoryId ? 'Seleccione una subcategoría' : 'Primero seleccione una categoría'}
                  </option>
                  {filteredSubCategories.map(subCategory => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.subcategoriaId?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
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
            {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductForm; 