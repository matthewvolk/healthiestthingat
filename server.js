/* ----------------------- *\
    Imports
\* ----------------------- */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');

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
 * https://trello.com/b/jpmbSMvv/healthiestthingat
 * 
 */
