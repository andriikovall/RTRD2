const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const config = require('./config');

const port = process.env.PORT || 5000;

const app = express();

require('./passport')(passport);

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Mongo connected.'))
  .catch(error => console.log(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(morgan);
app.use(passport.initialize());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/event', require('./routes/event'));

app.listen(port, () => console.log(`Server has been started on ${port}`));

module.exports = app;
