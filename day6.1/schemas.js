let mongoose = require('mongoose')

const discoSchema = new mongoose.Schema({
    titulo:{   type: String,
        required: [true,'El nombre es un requisito']},
    artista:{  type:mongoose.Schema.Types.ObjectId, ref: "artista", require:true},
    año:  {  type: Number,
        required: [true,'El año es un requisito']},
    genero: String,
    stock:{ type: Number,
        required: [true,'El año es un requisito']},
    formato: String,

})

const artistaSchema = new mongoose.Schema({
    nombre: { type: String,
        required: [true,'El nombre es un requisito']},
    genero:{type: String,
        required: [true,'El gener es un requisito']},
    fechaDeNacimiento: Date,
    nacionalidad:{type: String,
        required: [true,'La nacionalidad es un requisito']},
    nombreArtistico:String
})


let Disco = mongoose.model('disco', discoSchema)
let Artista = mongoose.model('artista',artistaSchema )


module.exports = {Disco , Artista} 