const MongoDB = require('../models/model')

exports.getArt = (req, res, next) => {
    MongoDB.fetchAll();   
}

exports.insert = (message, req, res, next) => {
    MongoDB.insert(message);
}