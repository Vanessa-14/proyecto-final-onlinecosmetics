const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Producto = require('./producto');
const Usuario = require('./usuario');


let Schema = mongoose.Schema;

let pedidoSchema = new Schema({

    usuario: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    producto: {
        type: String,
        required: [true, 'Por favor ingrese el producto']
    },
    cantidad: {
        type: Number,
        required: [true, 'Por favor ingresa la cantidad']

    },
    estado: {
        type: Boolean,
        default: true
    }
});

pedidoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Pedido', pedidoSchema);