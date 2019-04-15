var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, resp, next) => {
    db('musicas').then((musicas) => {
        resp.render('index', {
            musicas: musicas
        });
    }, next);
});

router.get('/add', (req, resp, next) => {
    resp.render('add');
});

router.post('/', (req, resp, next) => {
    db('musicas').insert(req.body).then((ids) => {
        console.log(ids);
        resp.redirect('/');
    }, next);
});

router.get('/edit/:id', (req, resp, next) => {
    const {id} = req.params;
    db('musicas').where('id', id)
        .first()
        .then((musica) => {
            if (!musica) {
                return resp.send(400);
            }
            resp.render('edit.njk', {
                musica: musica
            });
        }, next);
});

router.put('/edit/:id', (req, resp, next) => {
    const {id} = req.params;
    db('musicas').where('id', id)
        .update(req.body)
        .then((result) => {
            if (result === 0) {
                return resp.send(400);
            }
            resp.redirect('/');
        }, next);
});

router.delete('/delete/:id', (req, resp, next) => {
    const {id} = req.params;
    db('musicas').where('id', id)
        .delete()
        .then((result) => {
            if (result === 0) {
                return resp.send(400);
            }
            resp.redirect('/');
        }, next);
});

module.exports = router;
