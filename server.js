const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => res.render('index'));

app.post('/search', (req, res) => {
  res.json({ search: 'success' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`HTA listening on port ${PORT}`));
