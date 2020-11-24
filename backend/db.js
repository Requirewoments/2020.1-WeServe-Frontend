const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("backend"))
            .catch(err => console.log(err))
             
module.exports = { findAll, insert }

function findAll(callback){  
    global.conn.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}