const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());
app.use(routes);

const main = async () => {
    const uri = 'mongodb%2Bsrv%3A%2F%2Fmaiconmares%3Aqnpjeposf4580%40cluster0.pr5dc.mongodb.net%2FWeServe%3FretryWrites%3Dtrue%26w%3Dmajority';
    const client = new MongoClient(decodeURIComponent(uri), {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();

        await listDatabases(client);
    } catch (e) {
        console.log(e);
    }
}

const listDatabases = async client => {
    let databasesList = await client.db().admin().listDatabases();

    console.log('All is working! Databases:');
    databasesList.databases.forEach(db => console.log(`- ${db.name}`));
}

main().catch(console.error);

/*mongoose.connect('mongodb+srv://maiconmares:qnpjeposf4580@cluster0.pr5dc.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});*/

app.listen(3003);