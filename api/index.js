const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.get('/', (req, res) => res.render('index'));

router.post('/search', (req, res) => { // maybe change to /v1/search

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

router.get('/search', (req, res) => { // maybe change to /v1/search
  let restaurantQuery = req.query.q;

  // connect to pg
  // STRICT levanshtein fuzzystrmatch
  // store in JSON object to be sent to front end

  // connect to pg
  // query DB for filterable terms (calories, protein, fat, carbs)
  // store in same JSON object as results and send to front end

  res.json({ "Hello": restaurantQuery });
});

router.get('/search/dropdown' /* as in /search/dropdown?q={restaurantQuerySoFar}, maybe change to /v1/search/dropdown */, (req, res) => {
  let restaurantQuerySoFar = req.query.q; // data sent from an AJAX request that triggers as user types in search bar

  // connect to pg
  // LOOSE levanshtein fuzzystrmatch 
  // store results in JSON object and send to front end

  res.json({/* if search bar has "taco": Taco Bell, Del Taco, Jack in the Box (J in the B would be tricky) */ restaurantQuerySoFar});
});

module.exports = router
