const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect('mongodb+srv://maiconmares:qnpjeposf4580@cluster0.pr5dc.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(3003);