const getDb = require('../util/database').getDB;
var myobj = { _id: "1", value: "40" };

module.exports = class Article {
    // constructor(title, content) {
    //     this.title = title;
    //     this.content = content;
    // }

    //  save() {
    //      articles.push(this);
    //  }

    static fetchAll() {
        const db = getDb();
        return db.collection('Arduino')
        .find()
         .toArray()
        .then(articles => {
            console.log(articles);
            return articles;
        })
        .catch(err => {
            console.log(err);
        });
     }

     static insert(message) {
        var myobj = { _id: Date.now(), value: message };
        const db = getDb();
        return db.collection('Arduino')
        .insert(myobj)
        .catch(err => {
            console.log(err);
        });
     }
}