const express = require('express');
const cookie = require('cookie-parser');
const cors = require('cors');
const mongo = require('mongoose');
const routes = require('./src/routes');

const port = process.env.PORT || 3001;
const app = express();

mongo.connect('mongodb://localhost:27017/commentdb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, (error) => {
    error ? console.log(`Error: ${error}`) : console.log('MongoDB connected successfully.');
});

app.use(express.json());
app.use(cookie());
app.use(cors());
app.use(routes);
app.listen(port, () => console.log(`Server runing in port ${port}`));

// Hello, git