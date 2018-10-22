const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => res.render('index'));

app.post('/search', (req, res) => {
  var restaurantQuery = req.body.restaurantQuery;

  res.json(`Darn! We don't have any nutritional data on ${restaurantQuery} yet. To request that we add ${restaurantQuery} data to our database, blah blah blah`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

/**
 * TODO: 
 * 
 * 1. Database Connection
 * 2. Render actual HTML with JQuery instead of JSON.Stringify()
 */