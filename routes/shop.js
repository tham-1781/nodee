const express = require('express');

const indexController = require('../controllers/shop/index');
const productsController = require('../controllers/shop/products');
const cartController = require('../controllers/shop/cart');
const checkoutController = require('../controllers/shop/checkout');
const ordersController = require('../controllers/shop/orders');

const router = express.Router();

router.get('/', indexController.getIndex);
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProduct);
router.get('/cart', cartController.getIndex);
router.post('/cart', cartController.postCart);
router.post('/cart-delete', cartController.deleteCart);
router.get('/checkout', checkoutController.getIndex);
router.get('/orders', ordersController.getIndex);

module.exports = router;
