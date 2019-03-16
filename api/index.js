const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.get('/', (req, res) => res.render('index'));

// Search API
router.post('/search', (req, res) => {

  /**
   * TODO: Fuzzy Text Searching
   * 
   * This method chain below is just a really bad 
   * manual implementation of fuzzy text searching. I also need to 
   * figure out how to best store data returned by Postgres. 
   * I also need to rename this file to api.js and take out
   * the front end so just show the React.js frontend. 
   */
  let restaurantQuery = req.body.restaurantQuery
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .map((s) => s.replace(/\W/g, ''))
    .join(' ')
    .trim();

  const pgConnection = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  pgConnection.connect()
   .then(() => {

       const searchQuery = "SELECT * FROM restaurant_menu_items WHERE restaurant_name=$1 AND calories_kcal!='0' AND menu_item_category='Entrée' ORDER BY calories_kcal ASC, protein_grams DESC;"
       const searchQueryParams = [restaurantQuery];

       return pgConnection.query(searchQuery, searchQueryParams);
   })
   .then((results) => {
       // DEBUG:
       // console.log(results.rows);

       if (results.rows.length > 0) {
           res.send(results.rows);
       } else {
           res.send(`Nutritional data on ${restaurantQuery} is coming soon!`);
       }
   })
   .catch((err) => {
       console.error('ERR:', err);
   });

});

// TODO: Refactor POST above to instead use a GET with query params
router.get('/search', (req, res) => {
  let restaurantQuery = req.query.q;

  // connect to pg
  // STRICT levanshtein fuzzystrmatch
  // store in JSON object to be sent to front end

  // connect to pg
  // query DB for filterable terms (calories, protein, fat, carbs)
  // store in same JSON object as results and send to front end

  res.json({ "Hello": restaurantQuery });
});

// TODO: Create GET for React search bar component dropdown suggestion list
router.get('/dropdown/list' /* change to /dropdown-list? */, (req, res) => {
  let restaurantQuerySoFar = req.data; // Get the data from the AJAX request

  // connect to pg
  // LOOSE levanshtein fuzzystrmatch 
  // store results in JSON object and send to front end

  res.json({/* if search bar has "taco": Taco Bell, Del Taco, Jack in the Box (J in the B would be tricky) */ restaurantQuerySoFar});
});

module.exports = router
