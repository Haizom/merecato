const express = require('express');
const { createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory,
    deleteCategory } = require('../controllers/categoryController');
const upload = require('../config/storageConfig');
const categoryRoutes = express.Router();

categoryRoutes.post('/', upload.single('image'), createCategory);
categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.patch('/:id', upload.single('image'), updateCategory);
categoryRoutes.delete('/:id', deleteCategory);

module.exports = categoryRoutes;
