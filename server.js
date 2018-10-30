/* ----------------- *\
    Imports
\* ----------------- */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');

/* ----------------- *\
    Setup & Config
\* ----------------- */
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* ----------------- *\
    Routes
\* ----------------- */
app.get('/', (req, res) => res.render('index'));

app.post('/search', (req, res) => {
  var restaurantQuery = req.body.restaurantQuery;

  res.send(`Nutritional data on ${restaurantQuery} is coming soon!`);
});

/* ----------------- *\
    Server
\* ----------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

/**
 * TODO: 
 * 
 * 1. Database Connection
 * 2. Render actual HTML with JQuery instead of JSON.Stringify()
 */