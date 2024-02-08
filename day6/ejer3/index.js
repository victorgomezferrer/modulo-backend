const express = require('express');
const app = express();

let { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

async function connectMongo() {
    try {
        await client.connect()
            .then((client) => app.locals.db = client.db('mix'))
        await client.db("admin").command({ ping: 1 })
        console.log("🟢 MongoDB está conectado")
    } catch (error) {
        console.error("🔴 MongoDB no conectado:", error)
    }
}
connectMongo()
app.use(express.static('public'))


app.get('/api/series', async (req, res) => {
    try {
        const results = await app.locals.db.collection('series').find({}).toArray();
        res.send({ mensaje: "Documentos encontrados: " + results.length, results });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al hacer la consulta', error });
    }
});

app.post('/api/nuevaSerie', async (req, res) => {
    let { titulo, plataforma, nota } = req.body
    nota = parseInt(nota)
    try {
        const results = await app.locals.db.collection('series').insertOne({ titulo, plataforma, nota })
        res.send({
            mensaje: "Documento insertado: " + results.insertedId, results
        })
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al hacer la inserción', error
        });
    }
})


app.get('/api/series/:titulo', async (req, res) => {
    try {
        const results = await app.locals.db.collection('series').find({ titulo: req.params.titulo }).toArray();
        res.send({ mensaje: "Documentos encontrados: " + results.length, results });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al hacer la consulta', error });
    }
});





app.listen(PORT, (e) => {
    e
        ? console.error('No se ha podido iniciar el servidor')
        : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

})