var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.end()  
});

var photoRouter = express.Router();
photoRouter.get('/', (req, res) => {});
photoRouter.post('/', (req, res) => {});
photoRouter.get('/:id', (req, res) => {});
photoRouter.patch('/:id', (req, res) => {});
photoRouter.delete('/:id', (req, res) => {});
app.use('/photo', photoRouter);

var albumRouter = express.Router();
albumRouter.get('/', (req, res) => { });
albumRouter.post('/', (req, res) => { });
albumRouter.get('/:id', (req, res) => { });
albumRouter.patch('/:id', (req, res) => { });
albumRouter.delete('/:id', (req, res) => { });
app.use('/album', albumRouter);

module.exports = app;
