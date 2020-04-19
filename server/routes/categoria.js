const express = require('express');
const _ = require('underscore');
const Categoria = require('../models/categoria'); //subir nivel
const app = express();

app.get('/categoria', (req, res) => {

    Categoria.find({ estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, categorias) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.categoria);
            return res.status(200).json({
                ok: true,
                count: categorias.length,
                categorias
            });
        });
});

app.post('/categoria', (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: body.usuario,
        img: body.img,
        estado: body.estado
    });

    categoria.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            catDB
        });
    });
});

app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'usuario', 'img', 'estado']);
    categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            catDB
        });

    });
});
app.delete('/categoria/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;