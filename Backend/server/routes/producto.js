const express = require('express');
const _ = require('underscore');
const Producto = require('../models/producto'); //subir nivel
const app = express();
//id
app.get('/producto/:idcategoria', (req, res) => {
    Producto.find({categoria: req.params.idcategoria})
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                productos
            });
        });
});


app.get('/producto', (req, res) => {

    Producto.find({ estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, productos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.producto);
            return res.status(200).json({
                ok: true,
                count: productos.length,
                productos
            });
        });
});
app.post('/producto', (req, res) => {
    let body = req.body;
    let producto = new Producto({
        img: body.img,
        nombre: body.nombre,
        marca: body.marca,
        descripcion: body.descripcion,
        color: body.color,
        precio: body.precio,
        categoria: body.categoria,
        estado: body.estado,
    });

    producto.save((err, produDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            produDB
        });
    });
});

app.put('/producto/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['img', 'nombre', 'marca', 'descripcion', 'color','precio', 'categoria', 'estado']);
    producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, produDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            produDB
        });

    });
});
app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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