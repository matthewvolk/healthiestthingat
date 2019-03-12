const express = require('express');
const router = express.Router();
const { Client } = require('pg');

// Root path
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

       // Create and Sanitize SQL Query
       const searchQuery = "SELECT * FROM restaurant_menu_items WHERE restaurant_name=$1 AND calories_kcal!='0' AND menu_item_category='Entrée' ORDER BY calories_kcal ASC, protein_grams DESC;"
       const searchQueryParams = [restaurantQuery];

       // Execute SQL Query
       return pgConnection.query(searchQuery, searchQueryParams);
   })
   .then((results) => {
       // DEBUG:
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
