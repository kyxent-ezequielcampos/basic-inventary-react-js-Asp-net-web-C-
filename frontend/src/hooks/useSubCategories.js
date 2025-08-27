import { useState, useEffect, useCallback } from 'react';
import SubCategoryService from '../services/SubCategoryService';

export const useSubCategories = (categoryId = null) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todas las subcategorías o por categoría específica
  const loadSubCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (categoryId) {
        data = await SubCategoryService.getByCategory(categoryId);
      } else {
        data = await SubCategoryService.getAll();
      }
      setSubCategories(data);
    } catch (err) {
      setError(err.message || 'Error al cargar subcategorías');
      console.error('Error en loadSubCategories:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  // Crear nueva subcategoría
  const createSubCategory = useCallback(async (subCategoryData) => {
    setLoading(true);
    setError(null);
    try {
      const newSubCategory = await SubCategoryService.create(subCategoryData);
      setSubCategories(prev => [...prev, newSubCategory]);
      return newSubCategory;
    } catch (err) {
      setError(err.message || 'Error al crear subcategoría');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar subcategoría
  const updateSubCategory = useCallback(async (id, subCategoryData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedSubCategory = await SubCategoryService.update(id, subCategoryData);
      setSubCategories(prev => 
        prev.map(subCat => subCat.id === id ? updatedSubCategory : subCat)
      );
      return updatedSubCategory;
    } catch (err) {
      setError(err.message || 'Error al actualizar subcategoría');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar subcategoría
  const deleteSubCategory = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await SubCategoryService.delete(id);
      setSubCategories(prev => prev.filter(subCat => subCat.id !== id));
    } catch (err) {
      setError(err.message || 'Error al eliminar subcategoría');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar subcategorías al montar el componente o cambiar categoryId
  useEffect(() => {
    loadSubCategories();
  }, [loadSubCategories]);

  return {
    subCategories,
    loading,
    error,
    loadSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
  };
}; 