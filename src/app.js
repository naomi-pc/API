const express = require('express');
//usando sintaxis de desestructuracion
const {engine, create} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bookRoutes = require('./routes/books');
const { use } = require('express/lib/application');

const app = express();
app.set('port', 3000);


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
    console.log('Escuchando en el puerto', app.get('port'));
})

app.use(express.static(__dirname + '/public'));

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'book_db'    
}, 'single'));

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}))
app.set('view engine', 'hbs');

app.use('/', bookRoutes);

app.get('/',(req, res) => {
    res.render('index');
})

app.get('/autores-index', (req, res) => {
    res.render('autoresIndex');
});

app.get('/autores', (req, res) => {
    res.render('autores');
});

app.get('/libros-index', (req, res) => {
    res.render('librosIndex');
});

app.get('/contacto', (req, res) => {
    res.render('contacto');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/shop', (req, res) => {
    res.render('shopIndex');
});