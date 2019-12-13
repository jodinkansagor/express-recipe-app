const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(require('./Routes/recipe'));
app.use(require('./Routes/attempt'));

module.exports = app;
