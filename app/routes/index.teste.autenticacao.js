var express = require('express');
var router = express.Router();

router.get('/', (req, resp, next) => {
    if (req.session.nome) {
        resp.redirect('/home');
    } else {
        resp.render('login');
    }
});

router.post('/', (req, resp, next) => {
    if (req.body.nome == 'admin' && req.body.senha == '9655') {
        req.session.nome = req.body.nome;
        resp.redirect('/home')
    } else {
        resp.redirect('/')
    }
});

router.get('/home', (req, resp, next) => {
    if (req.session.nome == 'admin') {
        resp.render('home', {
            session: req.session,
            usuario: req.session.nome
        });
    } else {
        resp.redirect('/');
    }
});

router.get('/logout', (req, resp, next) => {
    req.session.destroy();
    resp.redirect('/')
});

module.exports = router;
