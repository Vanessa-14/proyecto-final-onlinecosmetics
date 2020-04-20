const express = require('express');
const _ = require('underscore');
const Categoria = require('../models/categoria'); //subir nivel
const app = express();

//Buscar por id 
app.get('/categoria/:id', (req, res) => {
    Categoria.findById(req.params.id)
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                categorias
            });
        });
});

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
            console.log(categorias);
            return res.status(200).json({
                ok: true,
                count: categorias.length,
                resp: categorias
            });
        });
});

app.post('/categoria', (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        img:  body.img,
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
    let body = _.pick(req.body, ['nombre', 'descripcion', 'img', 'estado']);
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