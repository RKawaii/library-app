const mongoose = require('mongoose');

let BookSchema = require('./../model-Schema/book');

var userConn = mongoose.createConnection(
  'mongodb://user_library:1234@localhost:27017/Library',
  {
    useNewUrlParser: true
  }
);

userConn.once('open', function() {
  console.log('user connection established successfully');
});

var Model = userConn.model('books', BookSchema);

module.exports = {
  getBook: (req, res) => {
    //console.log(req.param('limit') + ' ' + req.param('skip'));
    return Model.find(function(err, Books) {
      if (err) {
        res.json({ msg: 'Error', error: err });
      } else {
        res.json(Books);
      }
    }).limit(5);
  },
  getBookSkip: (req, res) => {
    return Model.find(function(err, Books) {
      if (err) {
        res.json({ msg: 'Error', error: err });
      } else {
        res.json(Books);
      }
    })
      .limit(5)
      .skip(parseInt(req.params.skip));
  }
};
//req.params.skip
