const getDb = require('../util/database').getDB;

module.exports = class MongoDB {
    static fetchAll() {
        const db = getDb();
        return db.collection('Arduino')
        .find()
         .toArray()
        .then(value => {
            console.log(value);
            return value;
        })
        .catch(err => {
            console.log(err);
        });
     }

     static insert(message) {
        var myobj = { _id: Date.now(), value: message };
        const db = getDb();
        return db.collection('Arduino')
        .insertOne(myobj)
        .catch(err => {
            console.log(err);
        });
     }
}