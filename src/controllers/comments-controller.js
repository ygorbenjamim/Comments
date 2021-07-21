const Comment = require('../models/comments-model');

module.exports = {
  async selectAll(req, res){
    const comment = await Comment.find();
    console.log('A request was made to fetch all comments.');
    return res.json(comment);
  },
  async create(req, res){
    const { text } = req.body;
    const data = { text };
    const comment = await Comment.create(data);
    console.log('A request was made to create a comment.');
    return res.json(comment);
  }
}