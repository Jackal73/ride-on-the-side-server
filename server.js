const dbConnection = require('./db');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use('/api/cars/', require ("./routes/carsRoute.js"));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Node JS Server listening on port ${port}!`));