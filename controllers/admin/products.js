const Product = require('../../models/product');
const ProductFormPresenter = require('../../presenters/admin/product-form');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'All products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  const presenter = new ProductFormPresenter(new Product(), 'Add product', '/admin/products/create', false);
  res.render('admin/product-form', presenter);
};

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) return res.redirect('/admin/products');
      const presenter = new ProductFormPresenter(
        product,
        'Edit product',
        '/admin/products/' + product._id,
        true,
        '/admin/products/' + product._id,
      );
      res.render('admin/product-form', presenter);
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteById(req.body.productId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(req.params.id, title, imageUrl, description, price, req.user._id);
  product
    .save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(null, title, imageUrl, description, price, req.user._id);
  product
    .save()
    .then(() => {})
    .catch((err) => console.log(err));
  res.redirect('/admin/products');
};
