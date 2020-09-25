const mongoDb = require('mongodb');
const ObjectId = require('../util/objectId');
const getDb = require('../util/database').getDb;

module.exports = class Product {
  constructor(id, title, imageUrl, description, price, userId) {
    this._id = id ? new ObjectId(id) : null;
    this.title = title || '';
    this.imageUrl = imageUrl || '';
    this.description = description || '';
    this.price = price || 0;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new ObjectId(id) })
      .then(() => console.log('Deleted'))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => products)
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongoDb.ObjectId(id) })
      .next()
      .then((products) => products)
      .catch((err) => console.log(err));
  }
};
