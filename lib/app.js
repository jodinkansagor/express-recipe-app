const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./Routes/recipe'));
app.use(require('./Routes/attempt'));

module.exports = app;
