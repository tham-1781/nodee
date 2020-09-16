const Product = require('../../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Home',
      path: '/',
    });
  });
};
