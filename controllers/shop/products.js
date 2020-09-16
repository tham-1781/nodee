const Product = require('../../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  Product.findById(+req.params.id, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  });
};
