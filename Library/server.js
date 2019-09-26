const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const user = require('./conn/user');
const Management = require('./conn/management');
const libraryRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());

//routes library
libraryRoutes.route('/getBooks').get(function(req, res) {
  user.getBook(req, res);
});
libraryRoutes.route('/getBooks/:skip').get(function(req, res) {
  user.getBookSkip(req, res);
});

libraryRoutes.route('/manage-book/add').post(function(req, res) {
  Management.addBook(req, res);
});

libraryRoutes.route('/manage-book/add-image').post(function(req, res) {
  Management.addBookImage(req, res);
});

//append routes to app
app.use('/library', libraryRoutes);
app.use('/library-img', express.static('assets'));
//listen
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`);
});
