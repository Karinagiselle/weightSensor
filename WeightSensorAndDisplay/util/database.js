const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var mongoDBURI = '' //here the mongoDBURI
let _db;

const mongoConnect = callback => {
    MongoClient.connect(mongoDBURI)
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log('Error');
        throw err;
    });
}

const getDB = () => {
    if(_db) {
        return _db;
    }
    throw 'No db'
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
