const express = require('express');
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();

const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) =>{
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name); //Path va a traer la extension del archivo.name

    if (!req.files) {
        return res.status(400).json({
            ok: false, 
            err:{
                message: 'No se a seleccionado ningun archivo'
            }
        })
    }

    let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
    if (!validExtensions.includes(archivo.mimetype)) { //Funcion que checa que la extencion este en el array, mimetype va a lanzar el tipo de la extension del archivo
        return res.status(400).json({
            ok: false, 
            err: {
                message: 'Solo las extensiones <png, jpg, gif, jpeg> son validas'
            }
        });    
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) =>{ //Es todo el path de la imagen
        if (err) {
            return res.status(500).json({
                ok: false, 
                err
            });
        }
    });
 
    switch(ruta){ //Es como un if, evaluara la variable, acttualizamos una collecion 
        case 'producto':
            imagenProducto(id, res, nombre)
        break;

        case 'categoria':
            imagenCategoria(id, res, nombre);
        break;
        default: 
        return res.status(400).json({
            ok: false, 
            err: {
                message: 'Ruta no valida'
            }
        });
        break;
    }   

});

function imagenProducto(id, res, nombreImagen){ //Actualizar el modelo producto Relaciona la imagen con una colleccion 
    Producto.findById(id, (err, prod)=>{
        if (err) {
            borrarArchivo(nombreImagen, 'producto');
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!prod) {
            borrarArchivo(nombreImagen, 'producto');
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Producto no existe'
                }
            }); 
        }
        prod.img = nombreImagen;

        prod.save((err, produDB)=>{
            if (err) {
                borrarArchivo(nombreImagen, 'producto');
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
}

function imagenCategoria(id, res, nombreImagen){ //Actualizar el modelo usuario El hilo del usuario 
    Categoria.findById(id, (err, cat)=>{
        if (err) {
            borrarArchivo(nombreImagen, 'categoria');
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!cat) {
            borrarArchivo(nombreImagen, 'categoria');
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Categoria no existe'
                }
            }); 
        }
        cat.img = nombreImagen;

        cat.save((err, catDB)=>{
            if (err) {
                borrarArchivo(nombreImagen, 'categoria');
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
}

function borrarArchivo(nombreImagen, ruta){
    let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`); //Resolvera la ruta donde se encuentra la imagen 
    if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg);

    }
    console.log('Imagen borrada con exito');
}

module.exports = app;