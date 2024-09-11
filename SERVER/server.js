const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./db');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

app.use(cors());
app.use(routes);
app.use(express.static('public'));

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
