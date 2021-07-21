const mongo = require('mongoose');

const dataSchema = mongo.Schema({
  text: String
}, { timestamp: true });

const comments = mongo.model('Comments', dataSchema);
module.exports = comments;