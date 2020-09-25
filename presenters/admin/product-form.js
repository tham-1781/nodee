module.exports = class ProductFormPresenter {
  constructor(product, pageTitle, path, editing = false) {
    this.product = product;
    this.pageTitle = pageTitle;
    this.path = path;
    this.editing = editing;
    this.formData = { method: 'POST', action: '/admin/save-product' };
  }
};
