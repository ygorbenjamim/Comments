const Comment = require('../models/comments-model');

module.exports = {
  async selectAll(req, res){
    const comment = await Comment.find();
    console.log('A request was made to fetch all comments.');
    return res.json(comment);
  },
  async create(req, res){
    const { email, text } = req.body;
    const data = { email, text };
    const comment = await Comment.create(data, (error) => {
      error ? console.log(`Error: ${error}`) : console.log('A request was made to create a comment.');
    });
    return res.json(comment);
  }
}