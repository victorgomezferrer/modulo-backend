let express = require('express')
let mongoose = require('mongoose')
let app = express()
let port = process.env.PORT || 3001

let { Disco, Artista } = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017/')
    .then(console.log('🟢 MongoDB está conectado'))
    .catch(err => {
        console.log('🔴 MongoDB no conectado: ' + err)
    })

let uthopia = new Disco({
    _id: new mongoose.Types.ObjectId(),
    titulo: "uthopia",
    artista: "Travis Scott",
    año: 2023,
    genero: "Trap",
    stock: 25,
    formato: "cd"
})

uthopia.save().then(console.log("uthopia añadido")).catch(e => console.error("No se ha podido añadir a uthopia" + e))

let travisBarker = new Artista({
    _id: new mongoose.Types.ObjectId(),
    nombre: "Travis Landon Barker",
    genero: "Punk",
    fechaDeNacimiento: 14 - 11 - 1975,
    nacionalidad: "Americano",
    nombreArtistico: "Travis Barker"
})
travisBarker.save().then(console.log("travis añadido")).catch(e => console.error("No se ha podido añadir a travis" + e))

app.get('/discos', async (req, res) => {
    try {
        let results = await Disco.find({ stock: { $lt: 0 } })
        res.send({ mensaje: "Se ha completado la petición", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})


app.get('/discos/:tituloId', async (req, res) => {
    try {
        let busqueda = req.params.tituloId
        // FIND CON OR O AND?????
        let results = await Disco.find({$or:[{ titulo: busqueda}, {_id: busqueda} ]})
        res.send({ mensaje: "Se ha completado la petición", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.post('/discos/anyadir', async (req, res) => {
    try {
        let results = await Disco.create({

            _id: new mongoose.Types.ObjectId(),
            titulo: "uthopia",
            artista: "Travis Scott",
            año: 2023,
            genero: "Trap",
            stock: 25,
            formato: "cd"

        })
        res.send({ mensaje: "Se ha completado la petición", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.post('/artista/anyadir', async (req, res) => {
    try {
        let results = await Artista.create({

            _id: new mongoose.Types.ObjectId(),
            nombre: "Travis Landon Barker",
            genero: "Punk",
            fechaDeNacimiento: 14 - 11 - 1975,
            nacionalidad: "Americano",
            nombreArtistico: "Travis Barker"
        })
        res.send({ mensaje: "Se ha completado la petición", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.put('/discos/actualizar', async(req,res)=>{
try{
    let results =  await Disco.findOneAndUpdate({titulo: "uthopia"},{stock:100})
    res.send({ mensaje: "Se ha completado la petición", results })
}
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.delete('/discos/borrar',async(req,res)=>{
    try{
        let results = await Disco.deleteOne({titulo: "uthopia"})
        res.send({ mensaje: "Se ha completado la petición", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.listen(port, (e) =>
    e
        ? console.log("Servidor fallido")
        : console.log("Servidor conectado en el puerto: " + port))
