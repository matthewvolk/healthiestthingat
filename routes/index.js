const express = require('express');
const router = express.Router();
const { Client } = require('pg');

/* ----------------------- *\
    Index
\* ----------------------- */
router.get('/', (req, res) => res.render('index'));

/* ----------------------- *\
    Search API
\* ----------------------- */
router.post('/search', (req, res) => {

  let restaurantQuery = req.body.restaurantQuery
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

module.exports = router
