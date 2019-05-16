const db = require('../database-mysql/index.js');
const path = require('path')

module.exports.fallback = (req, res) => {
    res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
};

module.exports.getItems = (req, res) => {
    db.selectAll(function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
}