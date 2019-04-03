// start the server: npm run servermon

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to mongodb
mongoose.connect(db, {
      useNewUrlParser: true
   })
   .then(() => console.log('MongoDB connected successfully')).catch(err => console.log(err));

// Passport middlewere
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// use routes:
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));