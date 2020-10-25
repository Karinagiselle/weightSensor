const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://admin:admin@weightsensor.fxtta.mongodb.net/TestDB?retryWrites=true&w=majority')
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
