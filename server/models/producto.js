const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;
let productoSchema = new Schema({
    img: {
        type: String,
    },
    nombre: {
        type: String,
        required: [true, 'Porfavor ingresa el nombre']
    },
    marca: {
        type: String,
        required: [true, 'Porfavor ingresa la marca']
    },
    descripcion: {
        type: String,
        required: [true, 'Porfavor ingresa la descripcion']
    },
    color: {
        type: String,
        required: [true, 'Porfavor ingresa el color']
    },
    precio: {
        type: String,
        required: [true, 'Porfavor ingresa el precio']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        //required: [false, 'Por favor ingresa la categoria']
    },
    estado: {
        type: Boolean,
        default: true
    }

});
//el esquema utilize el plugin
productoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Producto', productoSchema);