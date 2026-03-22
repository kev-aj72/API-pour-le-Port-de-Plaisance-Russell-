const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const cors         = require('cors')

const catwaysRoutes = require ('./routes/catways');
const usersRoutes   = require ('./routes/users');
const reservationsRoutes = require ('./routes/reservations');
const navRoutes = require('./routes/nav');
const mongodb      = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.get('/', (req, res) => {
    res.render('index');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


app.use('/', usersRoutes);
app.use('/', catwaysRoutes);
app.use('/', reservationsRoutes);
app.use('/', navRoutes);
app.use(function(req, res, next) {
    res.status(404).json({name: 'API', version: '1.0', status: 404, message: 'not_found'});
});

module.exports = app;
