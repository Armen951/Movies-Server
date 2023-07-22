require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const moviesRoute = require('./routes/movies');

const corsOptions = {
    origin: process.env.CLIENT_APP_URL,
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.use('/movies', moviesRoute);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
