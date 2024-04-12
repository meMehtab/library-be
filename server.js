const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const http = require("http").Server(app);

const journalRoute = require('./modules/journal/routes/jounal');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use('/journal', journalRoute);

http.listen('3000', () => {
    console.log('Server listening on port 3000');
});