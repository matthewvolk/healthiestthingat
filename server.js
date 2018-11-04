/* ----------------- *\
    Imports
\* ----------------- */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');

require('dotenv').config();

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
  // Query database, return all row where restaurant_name == restaurantQuery
  // Create an array of objects where each restaurant menu item is an object in the array
  res.send(`Nutritional data on ${restaurantQuery} is coming soon!`);
});

/* ----------------- *\
    Server
\* ----------------- */
app.listen(process.env.PORT, () => 
  console.log(`\nApplication listening on http://localhost:${process.env.PORT}/\n`)
);

/**
 * TODO: 
 * 
 * [X] Turn Google Sheets -> CSV
 * [X] Import CSV into local PostgreSQL as a table
 * [] Connect local PostgreSQL to Node/Express
 * [] Provision Heroku PostgreSQL
 * [] Import CSV into Heroku PostgreSQL as a table
 * [] Read about database migrations between Heroku and Local PostgreSQL (https://devcenter.heroku.com/articles/heroku-postgres-import-export)
 * [] Configure .env files to connect to databases based on process.env.NODE_ENV for dev and prod
 * [] Use body-parser to parse incoming client post requests to /search for search query to send to database
 * [] Query database RESTAURANT NAME column for parsed incoming body request
 * [] Display loader icon while database is queried
 * [] Get results from database query to render actual HTML with JQuery instead of JSON.Stringify() in js/src/search.js
 * [] If no restaurant name is found, display either:
 *     - A message: "No data on %query yet, but your search request just sent us a message that you would like us to add %query"
 *     - A button: "Click here to vote for us to add %query"
 *     I need to look out for and parse mumbo jumbo like "test" queries
 * [] Format returned data
 * 
 */