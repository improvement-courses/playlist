var createError = require('http-errors');
var express = require('express'); // Módulo central da aplicação
var path = require('path'); // Caminho principal da aplicação
var favicon = require('serve-favicon');
var logger = require('morgan'); // Logs de requisições http
var cookieParser = require('cookie-parser'); // habilita o serviodor a trabalhar com cokkies
var expressNunjucks = require('express-nunjucks'); // Template engine
var index = require('./routes/index'); // Definições destas rotas
var methodOverride = require('method-override'); // Conversão para PUT e DELETE dos formulaários HTML
//require('./models/musics') // Model para ser usado com o mongo
//var mongoose = require('mongoose'); // Para trabalhar melhor com o mongo
//mongoose.Promise = require('bluebird'); // Para excutar promisses com o mongoose
//mongoose.connect('mongodb://localhost/musics', {useNewUrlParser: true}); // Criando conexão com o mongo
var session = require('express-session'); // Trabalhar com sessões
var passport = require('passport');
require('./passport');

var app = express(); // Chama a função de execução do express

app.use(session({
    secret: 'teste sessoes',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Diretório onde encontrar os arquivos de templates
app.set('view engine', 'njk'); // Template engine adotado
var njk = expressNunjucks(app, {watch: true, noCache: true});

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico'))) // Caminho do icon da aplicação

app.use(express.json()); // Configura a aplicação para receber requisições de formulários HTML e arquivos Json
app.use(express.urlencoded({
    extended: false
}));
    
app.use(logger('dev')); // Configura o módulo de logger
app.use(cookieParser()); // Configura o Express para inserir no objeto req os dados dos cookies
/**
 * Habilita o Express para reconhecer o diretório em
 * que se encontram esses arquivos (no caso, o diretório public ), e
 * os envia em uma solicitação http.
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride((req, resp) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

app.use('/', index); // (/) são tratados pelo módulo index

app.use((req, resp, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
