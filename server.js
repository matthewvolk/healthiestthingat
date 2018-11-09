/* ----------------------- *\
    Imports
\* ----------------------- */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
const { Client } = require('pg');

/* ----------------------- *\
    Setup & Config
\* ----------------------- */
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* ----------------------- *\
    Routes
    TODO: express.Router
\* ----------------------- */
app.get('/', (req, res) => res.render('index'));

app.post('/search', (req, res) => {

  var restaurantQuery = req.body.restaurantQuery
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .map((s) => s.replace(/\W/g, ''))
    .join(' ')
    .trim();

  // Open connection to database
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  client.connect()
   .then(() => {

       // Create and Sanitize SQL Query
       const searchQuery = "SELECT * FROM restaurant_menu_items WHERE restaurant_name=$1 AND calories_kcal!='0' AND menu_item_category='Entrée' ORDER BY calories_kcal ASC, protein_grams DESC;"
       const searchQueryParams = [restaurantQuery];

       // Execute SQL Query
       return client.query(searchQuery, searchQueryParams);
   })
   .then((results) => {
       // Log Promise
       // console.log(results.rows);

       // If Promise contains rows that have data, send those to the front end
       if (results.rows.length > 0) {
           res.send(results.rows);
       } else {
           res.send(`Nutritional data on ${restaurantQuery} is coming soon!`);
       }
   })
   .catch((err) => {
       console.log('ERR:', err);
   });

});

/* ----------------------- *\
    Server
\* ----------------------- */
app.listen(process.env.PORT, () => 
  console.log(`\nApplication listening on http://localhost:${process.env.PORT}/\n`)
);

/**
 * TODO: 
 * 
 * [] Add flexbox grid to front page and display currently available restaurants
 * [] Add "Near You" functionality
 * [] understand how to break javascript out into separate, class based functions. Create a class to handle AJAX POST
 *    requests via clicking on a link. 
 * [] Read about database migrations between Heroku and Local PostgreSQL (https://devcenter.heroku.com/articles/heroku-postgres-import-export)
 * [] Search suggestions so that you can enter part of a restaurant name and see the rest of the name populate
 * [] If no restaurant name is found, display either:
 *     - A button: "Click here to vote for us to add %query" (I would need to look out for (parse) mumbo jumbo responses like "test")
 * [] Format returned data (CSS, JS animations, etc.)
 * 
 */
