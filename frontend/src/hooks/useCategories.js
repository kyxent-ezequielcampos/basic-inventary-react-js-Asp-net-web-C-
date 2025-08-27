import { useState, useEffect, useCallback } from 'react';
import CategoryService from '../services/CategoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todas las categorías
  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Error al cargar categorías');
      console.error('Error en loadCategories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nueva categoría
  const createCategory = useCallback(async (categoryData) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await CategoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err.message || 'Error al crear categoría');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar categoría
  const updateCategory = useCallback(async (id, categoryData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await CategoryService.update(id, categoryData);
      setCategories(prev => 
        prev.map(cat => cat.id === id ? updatedCategory : cat)
      );
      return updatedCategory;
    } catch (err) {
      setError(err.message || 'Error al actualizar categoría');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar categoría
  const deleteCategory = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await CategoryService.delete(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      setError(err.message || 'Error al eliminar categoría');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}; 