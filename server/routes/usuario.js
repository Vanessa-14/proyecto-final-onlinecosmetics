const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario'); //subir nivel
const app = express();

app.get('/usuario', (req, res) => {

    Usuario.find({ estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, usuarios) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.usuario);
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });
        });
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        //para poder mandar los datos a la coleccion
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //numero de veces de encriptar
        role: body.role, 
        img: body.img,
        estado: body.estado
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});


app.post('/registro', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        //para poder mandar los datos a la coleccion
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //numero de veces de encriptar
        role: body.role,
        img: body.img,
        estado: body.estado
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});


app.put('/usuario/:id',(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'password', 'estado', 'role', 'img']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });

    });
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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