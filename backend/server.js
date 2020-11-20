const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(3003);