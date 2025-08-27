import ClientHttp from './ClientHttp';

class ProductService {
  // Obtener todos los productos
  async getAll() {
    try {
      const response = await ClientHttp.get('/productos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  }

  // Obtener producto por ID
  async getById(id) {
    try {
      const response = await ClientHttp.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto ${id}:`, error);
      throw error;
    }
  }

  // Obtener producto por código
  async getByCode(code) {
    try {
      const response = await ClientHttp.get(`/productos/codigo/${code}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto por código ${code}:`, error);
      throw error;
    }
  }

  // Obtener productos por subcategoría
  async getBySubCategory(subCategoryId) {
    try {
      const response = await ClientHttp.get(`/productos/subcategoria/${subCategoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener productos de subcategoría ${subCategoryId}:`, error);
      throw error;
    }
  }

  // Obtener productos por categoría
  async getByCategory(categoryId) {
    try {
      const response = await ClientHttp.get(`/productos/categoria/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener productos de categoría ${categoryId}:`, error);
      throw error;
    }
  }

  // Crear nuevo producto
  async create(productData) {
    try {
      const response = await ClientHttp.post('/productos', productData);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  // Actualizar producto
  async update(id, productData) {
    try {
      const response = await ClientHttp.put(`/productos/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar producto ${id}:`, error);
      throw error;
    }
  }

  // Eliminar producto
  async delete(id) {
    try {
      const response = await ClientHttp.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      throw error;
    }
  }
}

export default new ProductService(); 