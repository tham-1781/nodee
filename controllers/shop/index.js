const Product = require('../../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Home',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};
