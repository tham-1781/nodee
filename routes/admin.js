const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const producsController = require('../controllers/admin/products');

router.get('/products/create', producsController.getAddProduct);

router.get('/products/:id', producsController.getEditProduct);
router.post('/products/:id', producsController.postEditProduct);
router.post('/delete-product', producsController.deleteProduct);

router.get('/products', producsController.getProducts);

router.post('/products/create', producsController.postAddProduct);

module.exports = router;
