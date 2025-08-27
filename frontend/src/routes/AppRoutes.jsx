import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/CategoriesPage';
import SubCategoriesPage from '../pages/SubCategoriesPage';
import ProductsPage from '../pages/ProductsPage';

const AppRoutes = () => {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <NavigationBar />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/subcategorias" element={<SubCategoriesPage />} />
            <Route path="/productos" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppRoutes; 