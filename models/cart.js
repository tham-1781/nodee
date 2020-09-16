const fs = require('fs');
const path = require('path');

const dataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static addProduct(product) {
    fs.readFile(dataPath, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!error) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (p) => p.id === product.id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: product.id, qty: 1, price: +product.price };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +product.price;
      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(dataPath, (error, fileContent) => {
      if (error) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((p) => +p.id === id);
      if (!product) return;
      updatedCart.products = updatedCart.products.filter((p) => +p.id !== id);
      updatedCart.totalPrice -= price * product.qty;
      fs.writeFile(dataPath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getProducts(cb) {
    fs.readFile(dataPath, (error, fileContent) => {
      if (error) {
        cb(null);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }
};
