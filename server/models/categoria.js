const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;
let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre de la categoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    img: {
        type: String

    },
    estado: {
        type: Boolean,
        default: true
    }


});

//el esquema utilize el plugin
categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Categoria', categoriaSchema);