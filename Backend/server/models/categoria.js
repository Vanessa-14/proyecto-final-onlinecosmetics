const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el email']
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }
   
});
//el esquema utilize el plugin
CategoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Categoria', CategoriaSchema);