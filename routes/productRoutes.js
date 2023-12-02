const express = require('express');
const { createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct,
    deleteProduct,
    getProductsByUserId,
    getProductsByCategoryId } = require('../controllers/productController');
const upload = require('../config/storageConfig');
const { userAuth } = require('../middleware/userAuth')
const productRoutes = express.Router();

productRoutes.post('/', userAuth, upload.array('media', 5), createProduct);
productRoutes.get('/', userAuth, getAllProducts);
productRoutes.get('/:id', getProductById);

productRoutes.get('/user/:userId', getProductsByUserId);
// productRoutes.get('/category/:categoryId', getProductsByCategoryId); // better to be query not parameter -  to do later
// productRoutes.patch('/:id', upload.single('file'), updateProduct);
// productRoutes.delete('/:id', deleteProduct);

module.exports = productRoutes;
