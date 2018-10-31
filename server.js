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
 * 1. Turn Google Sheets -> CSV
 * 2. Import CSV into local PostgreSQL as a table
 * 3. Connect local PostgreSQL to Node/Express
 * 4. Provision Heroku PostgreSQL
 * 5. Import CSV into Heroku PostgreSQL as a table
 * 6. Read about database migrations between Heroku and Local PostgreSQL (https://devcenter.heroku.com/articles/heroku-postgres-import-export)
 * 7. Configure .env files to connect to databases based on process.env.NODE_ENV for dev and prod
 * 8. Use body-parser to parse incoming client post requests to /search for search query to send to database
 * 9. Query database RESTAURANT NAME column for parsed incoming body request
 * 10. Display loader icon while database is queried
 * 11. Get results from database query to render actual HTML with JQuery instead of JSON.Stringify() in js/src/search.js
 * 12. If no restaurant name is found, display either:
 *     - A message: "No data on %query yet, but your search request just sent us a message that you would like us to add %query"
 *     - A button: "Click here to vote for us to add %query"
 *     I need to look out for and parse mumbo jumbo like "test" queries
 * 13. Format returned data
 */