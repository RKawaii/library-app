const mongoose = require('mongoose');

let BookSchema = require('./../model-Schema/book');

var managementConn = mongoose.createConnection(
  'mongodb://management_library:1234@localhost:27017/Library',
  {
    useNewUrlParser: true
  }
);

managementConn.once('open', function() {
  console.log('Management connection established successfully');
});

var Model = managementConn.model('books', BookSchema);

module.exports = {
  addBook: (req, res) => {
    let postModel = new Model(req.body);
    return postModel
      .save()
      .then(postModel => {
        res.status(200).send(`${postModel._id}`);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  addBookImage: (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'no file found' });
    }
    const file = req.files.file;
    let tmpExt = req.files.file.name.split('.');
    tmpExt = tmpExt[1];
    file.mv(`./assets/${req.headers.name + '.' + tmpExt}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else {
        console.log(`added file ${req.headers.name + '.' + tmpExt}`);
        return res.status(200).send('file uploaded succesfully');
      }
    });
  }
};
