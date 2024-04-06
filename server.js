const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const MongoClient = require('mongodb').MongoClient;
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 8080;

// Middleware
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/fitness.html'));
});

app.use('/fitness-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  next();
});

// OAuth routes
app.get('/auth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  );
});

app.get('/oauth-callback', ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      console.log('My token:', token);
      res.redirect(`/fitness-api?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

// Routes
app.use('/', routes);

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/fitness-api`);
    });
  }
});
