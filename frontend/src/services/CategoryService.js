import ClientHttp from './ClientHttp';

class CategoryService {
  // Obtener todas las categorías
  async getAll() {
    try {
      const response = await ClientHttp.get('/categorias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  }

  // Obtener categoría por ID
  async getById(id) {
    try {
      const response = await ClientHttp.get(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener categoría ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva categoría
  async create(categoryData) {
    try {
      const response = await ClientHttp.post('/categorias', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    }
  }

  // Actualizar categoría
  async update(id, categoryData) {
    try {
      const response = await ClientHttp.put(`/categorias/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar categoría ${id}:`, error);
      throw error;
    }
  }

  // Eliminar categoría
  async delete(id) {
    try {
      const response = await ClientHttp.delete(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar categoría ${id}:`, error);
      throw error;
    }
  }
}

export default new CategoryService(); 