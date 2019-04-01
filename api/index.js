const express = require('express');
const router = express.Router();
const { Client } = require('pg');

// TODO: Figure out how I made this work
function removeDuplicatesBy(keyFn, array) {
  var mySet = new Set();
  return array.filter(function(x) {
    var key = keyFn(x), isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
}

// TODO: Decommission index route
router.get('/', (req, res) => res.render('index'));

// TODO: Decommission POST search
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

router.get('/search/dropdown', (req, res) => { // maybe change to /v1/search/dropdown
  let restaurantQuerySoFar = req.query.q; // data sent from an AJAX request that triggers as user types in search bar
  console.log(restaurantQuerySoFar);

  // TODO if restaurantQuerySoFar is "taco", return: Taco Bell, Del Taco, Jack in the Box (Jack in the Box would be tricky)

  // Loose levanshtein fuzzystrmatch against 'restaurantQuerySoFar'
  const pgConnection = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  pgConnection.connect()
   .then(() => {
      // levenshtein() can only be used if Postgres fuzzystrmatch extension is installed on DB
      const searchQuery = "SELECT * FROM restaurant_menu_items WHERE levenshtein(upper($1), upper(restaurant_name)) <= 10;"
      const searchQueryParams = [restaurantQuerySoFar];

      return pgConnection.query(searchQuery, searchQueryParams);
   })
   .then((results) => {
      // console.log(results.rows);
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
          restaurantQuerySoFar
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
