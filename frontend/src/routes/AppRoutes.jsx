import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/CategoriesPage';
import SubCategoriesPage from '../pages/SubCategoriesPage';
import ProductsPage from '../pages/ProductsPage';

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/subcategorias" element={<SubCategoriesPage />} />
          <Route path="/productos" element={<ProductsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes; 