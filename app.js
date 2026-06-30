const config = require('./config');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const index = require('./routes/index');
const who = require('./routes/who');
const contact = require('./routes/contact');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', config.port);

app.use('/', express.static('public'))
app.use('/', index);
app.use('/who', who);
app.use('/contact', contact);

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`Demo app is running on ${config.port}!`);
  });
} else {
  // If required by tests, start server for testing
  const server = app.listen(config.port, () => {
    console.log(`Demo app is running on ${config.port}!`);
  });
  module.exports = server;
}
