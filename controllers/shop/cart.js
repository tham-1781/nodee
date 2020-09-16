const Product = require('../../models/product');
const Cart = require('../../models/cart');

exports.getIndex = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find((p) => p.id === product.id);
        if (cartProductData) {
          cartProducts.push({
            product,
            qty: cartProductData.qty,
            price: cartProductData.price * cartProductData.qty,
          });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your cart',
        path: '/cart',
        products: cartProducts,
        cart: cart,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(+productId, (product) => {
    Cart.addProduct(product);
  });
  res.redirect('/cart');
};

exports.deleteCart = (req, res, next) => {
  let { productId } = req.body;
  productId = +productId;
  Product.findById(productId, (product) => {
    if (!product) return;
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
};
