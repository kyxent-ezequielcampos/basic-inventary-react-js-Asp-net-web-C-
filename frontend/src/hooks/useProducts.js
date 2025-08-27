import { useState, useEffect, useCallback } from 'react';
import ProductService from '../services/ProductService';

export const useProducts = (categoryId = null, subCategoryId = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos según los filtros
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (subCategoryId) {
        data = await ProductService.getBySubCategory(subCategoryId);
      } else if (categoryId) {
        data = await ProductService.getByCategory(categoryId);
      } else {
        data = await ProductService.getAll();
      }
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
      console.error('Error en loadProducts:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, subCategoryId]);

  // Crear nuevo producto
  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await ProductService.create(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message || 'Error al crear producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar producto
  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await ProductService.update(id, productData);
      setProducts(prev => 
        prev.map(prod => prod.id === id ? updatedProduct : prod)
      );
      return updatedProduct;
    } catch (err) {
      setError(err.message || 'Error al actualizar producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar producto
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await ProductService.delete(id);
      setProducts(prev => prev.filter(prod => prod.id !== id));
    } catch (err) {
      setError(err.message || 'Error al eliminar producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar producto por código
  const searchByCode = useCallback(async (code) => {
    setLoading(true);
    setError(null);
    try {
      const product = await ProductService.getByCode(code);
      return product;
    } catch (err) {
      setError(err.message || 'Error al buscar producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos al montar el componente o cambiar filtros
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchByCode,
  };
}; 