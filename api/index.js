const express = require('express');
const router = express.Router();
const { Client } = require('pg');

/**
 * Filter an array of objects by iterating over a single key in the object
 * 
 * @param { Callback } keyFn Returns the key for which to search for duplicates in other objects in the array
 * @param { Object[] } array Array of objects (with the same schema) to be filtered
 * 
 * @returns { Object[] } Filtered array of objects
 */
function removeDuplicatesBy(keyFn, array) {
  var mySet = new Set();
  return array.filter(function(x) {
    var key = keyFn(x), isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
}

/**
 * @todo decommission index route
 */
router.get('/', (req, res) => res.render('index'));

/**
 * @todo decommission POST search
 */
router.post('/search', (req, res) => {

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

/**
 * @todo refactor api url to /api/v1/*
 */
router.get('/search', (req, res) => {
  let restaurantQuery = req.query.q;

  // connect to pg
  // STRICT levanshtein fuzzystrmatch using 'restaurantQuery'
  // store in JSON object to be sent to front end

  // connect to pg
  // query DB for filterable terms (calories, protein, fat, carbs)
  // store in same JSON object as results and send to front end

  // res.json({
  //    "queryResults": [
  //      queryResults.rows[i]
  //    ],
  //    "filters": [
  //      filterResults.rows[i]
  //    ]
  // });

});

/**
 * @todo if userInput is "taco", return: Taco Bell, Del Taco, *Jack in the Box*
 */
router.get('/search/dropdown', (req, res) => { 
  let userInput = req.query.q; 

  const pgConnection = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  pgConnection.connect()
   .then(() => {

      const searchQuery = "SELECT * FROM restaurant_menu_items WHERE levenshtein(upper($1), upper(restaurant_name)) <= 10;"
      const searchQueryParams = [userInput];

      return pgConnection.query(searchQuery, searchQueryParams);
   })
   .then((results) => {

      /**
       * @todo validate schema of restaurantsUnique before passing to removeDuplicatesBy()
       * @todo results.rows.has(restaurant_name)
       */
      let restaurantsUnique = [];
      restaurantsUnique = removeDuplicatesBy(x => x.restaurant_name, results.rows);
      let dropdownList = [];
      for (var i = 0; i < restaurantsUnique.length; i++) {
        dropdownList.push(restaurantsUnique[i].restaurant_name)
      }

      console.log(dropdownList)

      if (dropdownList.length > 0) {
          res.json({dropdownList})

      } else {
        const dropdownList = [
          'No results found in DB for:',
          userInput
        ];

        res.json({dropdownList})
      }
   })
   .catch((err) => {
       console.error('ERR:', err);
       const dropdownList = ["Cannot connect to database"];
       res.json({dropdownList})
   });

});

module.exports = router
