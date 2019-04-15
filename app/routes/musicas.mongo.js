var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', (req, resp, next) => {
    mongoose.model('Musica').find().then((musicas) => {
        resp.render('index', {
            musicas: musicas
        });
    }, next);
});

router.get('/add', (req, resp, next) => {
    resp.render('add');
});

router.post('/', (req, resp, next) => {
    var Musica = mongoose.model('Musica');
    var m = new Musica(req.body);

    m.save().then((result) => {
        resp.redirect('/');
    }, next);
});

router.get('/edit/:id', (req, resp, next) => {
    const {id} = req.params;
    mongoose.model('Musica').findOne({_id: id}).then((musica) => {
        resp.render('edit.njk', {
            musica: musica
        });
    }, next);
});

router.put('/edit/:id', (req, resp, next) => {
    const {id} = req.params;
    mongoose.model('Musica').update({ _id: id }, {
        $set: {
            nome: req.body.nome,
            artista: req.body.artista,
            estrelas: req.body.estrelas
        }
    }).then((musica) => {
        resp.redirect('/')
    }, next);
});

router.delete('/delete/:id', (req, resp, next) => {
    const {id} = req.params;
    mongoose.model('Musica').remove({ _id: id }).then((musica) => {
        resp.redirect('/');
    });
});

module.exports = router;
