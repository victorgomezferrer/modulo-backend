let mongoose = require('mongoose')


const usuarioSchema = new mongoose.Schema({
    nombre: { type: String,
        required: [true,'El nombre es un requisito']},
    email:{type: String,
        required: [true,'El gener es un requisito']},
    password:{type: String,
        required: [true,'La nacionalidad es un requisito']},
  

})


let Usuario = mongoose.model('usuario', usuarioSchema)



module.exports = Usuario