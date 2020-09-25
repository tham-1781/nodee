const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { getNotFoundPage } = require('./controllers/error');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findById('5f6dafae6a288a23e4bfd92f')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      throw err;
    });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(getNotFoundPage);

mongoConnect(() => {
  app.listen(3000);
});
