const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ Hello: "World" }))

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))