const express = require('express');
const Comment = require('./controllers/comments-controller');
const routes = express.Router();

routes.get('/comments', Comment.selectAll);
routes.post('/comments/insert', Comment.create);

module.exports = routes;