const express = require('express');
const error = require('./middleware/error');
const genres  = require('./routes/genre');
const user = require('./routes/user');
const auth = require('./routes/auth');
const customer = require('./routes/customer');
const movie = require('./routes/movie')

const app = express();

const PORT = process.env.PORT;
app.listen(PORT || 5000);

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/customers', customer);
app.use('/api/movies', movie);



app.use(error);