const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ HealthiestThingAt: "The only menu you should be looking at in the drive thru" }))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))