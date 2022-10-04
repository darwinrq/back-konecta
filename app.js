const Connection = require('./src/db/conection/Mysql');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

new Connection();
const port = 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const routerApp = require('./src/router');

app.use('/', routerApp);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


module.exports = { app, server };