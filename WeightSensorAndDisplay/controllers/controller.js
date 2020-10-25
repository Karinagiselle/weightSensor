const Article = require('../models/model')

exports.getArt = (req, res, next) => {
    Article.fetchAll()
    // .then(articles => {
    //     res.render('index', { poner: articles});
    // });
    
}

exports.insert = (req, res, next) => {
    Article.insert();
}