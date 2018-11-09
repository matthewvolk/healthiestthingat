/* ----------------------- *\
    Imports
\* ----------------------- */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
// const { Client } = require('pg');

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
\* ----------------------- */
app.use('/', require('./routes'));


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
