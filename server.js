const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))