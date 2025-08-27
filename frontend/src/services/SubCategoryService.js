import ClientHttp from './ClientHttp';

class SubCategoryService {
  // Obtener todas las subcategorías
  async getAll() {
    try {
      const response = await ClientHttp.get('/subcategorias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener subcategorías:', error);
      throw error;
    }
  }

  // Obtener subcategoría por ID
  async getById(id) {
    try {
      const response = await ClientHttp.get(`/subcategorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener subcategoría ${id}:`, error);
      throw error;
    }
  }

  // Obtener subcategorías por categoría
  async getByCategory(categoryId) {
    try {
      const response = await ClientHttp.get(`/subcategorias/categoria/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener subcategorías de categoría ${categoryId}:`, error);
      throw error;
    }
  }

  // Crear nueva subcategoría
  async create(subCategoryData) {
    try {
      const response = await ClientHttp.post('/subcategorias', subCategoryData);
      return response.data;
    } catch (error) {
      console.error('Error al crear subcategoría:', error);
      throw error;
    }
  }

  // Actualizar subcategoría
  async update(id, subCategoryData) {
    try {
      const response = await ClientHttp.put(`/subcategorias/${id}`, subCategoryData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar subcategoría ${id}:`, error);
      throw error;
    }
  }

  // Eliminar subcategoría
  async delete(id) {
    try {
      const response = await ClientHttp.delete(`/subcategorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar subcategoría ${id}:`, error);
      throw error;
    }
  }
}

export default new SubCategoryService(); 