const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ HealthiestThingAt: "The only menu you should look at in the drive through." }))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))