var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var postgres = require('./lib/postgres');

app.use(bodyParser.json({ type: 'application/json' }));

let lookupPhoto = (req, res, next) => {
  var photoId = req.params.id;
  var sql = 'SELECT * FROM photo WHERE id = ?';
  postgres.client.query(sql, [ photoId ], (err, results) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not retrieve photo'] });
    }
    if (results.rows.length === 0) {
      res.statusCode = 404;
      return res.json({ errors: ['Photo not found'] });
    }
    req.photo = results.rows[0];
    next();
  });
}

var photoRouter = express.Router();
photoRouter.get('/', (req, res) => {});
photoRouter.post('/', (req, res) => {
  var sql = 'INSERT INTO photo (description, filepath, album_id) VALUES ($1, $2, $3)';
  var data = [
    req.body.description,
    req.body.filepath,
    req.body.album_id,
  ];
  postgres.client.query(sql, data, (err, result) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({
        errors: ['Failed to create photo']
      });
    }
    var photoId = result.rows[0].id;
    var sql = 'SELECT * FROM photo WHERE id = $1';
    postgres.client.query(sql, [photoId], (err, result) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({
          errors: ['Could not retrieve photo after create']
        });
      }
      res.statusCode = 201;
      res.json(result.rows[0]);
    });
  });
});
photoRouter.get('/:id', lookupPhoto, (req, res) => {
  res.json(req.photo);
});
photoRouter.patch('/:id',lookupPhoto, (req, res) => {});
photoRouter.delete('/:id', lookupPhoto, (req, res) => {});
app.use('/photo', photoRouter);

var albumRouter = express.Router();
albumRouter.get('/', (req, res) => { });
albumRouter.post('/', (req, res) => { });
albumRouter.get('/:id', (req, res) => { });
albumRouter.patch('/:id', (req, res) => { });
albumRouter.delete('/:id', (req, res) => { });
app.use('/album', albumRouter);

module.exports = app;
