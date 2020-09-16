const Product = require('../../models/product');
const ProductFormPresenter = require('../../presenters/admin/product-form');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'All products',
      path: '/admin/products',
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  const presenter = new ProductFormPresenter(
    new Product(),
    'Add product',
    '/admin/products/create'
  );
  res.render('admin/product-form', presenter);
};

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.id, (product) => {
    if (!product) return res.redirect('/admin/products');
    const presenter = new ProductFormPresenter(
      product,
      'Edit product',
      '/admin/products/' + product.id,
      true
    );
    presenter.formData = {
      ...presenter.formData,
      action: '/admin/products/' + product.id,
    };
    res.render('admin/product-form', presenter);
  });
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteById(+req.body.productId);
  res.redirect('/admin/products');
};

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(
    +req.params.id,
    title,
    imageUrl,
    description,
    price
  );
  product.save();
  res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
};
