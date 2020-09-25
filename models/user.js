const ObjectId = require('../util/objectId');

const getDb = require('../util/database').getDb;

module.exports = class User {
  constructor(id, username, email, cart) {
    this._id = id;
    this.username = username;
    this.email = email;
    this.cart = cart;
  }

  save() {
    this.db().insertOne(this);
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex((cp) => {
      return cp._id === product._id;
    });

    const updatedCart = { items: [{ ...product, quantity: 1 }] };

    return this.db().updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: { cart: updatedCart },
      },
    );
  }

  static findById(id) {
    return getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  db() {
    return getDb().collection('users');
  }
};
