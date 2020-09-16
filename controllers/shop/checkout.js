exports.getIndex = (req, res, next) => {
  res.render('shop/checkout', {
    prods: products,
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
