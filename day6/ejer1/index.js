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


app.get('/api/mesas', async (req, res) => {
    try {
        const results = await app.locals.db.collection('tables').find().toArray();
        res.send({
            mensaje: "Documentos encontrados: " + results.length,
            results
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al hacer la consulta'
            ,

            error
        });
    }
});

app.post('/api/anyadir', async (req, res) => {
    try {
        let { Tamaño, Color, Material, Patas } = req.body
        console.log(Tamaño, Color, Material, Patas)
        const results = await app.locals.db.collection('tables')
            .insertOne({ Tamaño, Color, Material, Patas })
        res.send({
            mensaje: "Documento insertado: " + results.insertedId,
            results
        })
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al hacer la inserción'
            ,

            error
        });
    }
})

app.put('/api/modificar/:color', async (req, res) => {

    try {
        const results = await app.locals.db.collection('tables').updateMany({ color: req.params },{ $set: { color: "granate" } }
            )
        res.send({
            mensaje: "Documento modificado: " + results.modifiedCount,
            results
        })
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al hacer la modificación', error
        });
    }
})

app.delete('/borrar/:id', async (req, res) => {
        try {
            const results = await app.locals.db.collection('tables').deleteMany({patas: parseInt(req.params.patas)})
            res.send({
                mensaje: "Documento borrado: " + results.deletedCount, results
            })
        } catch (error) {
            res.status(500).send({
                mensaje: 'Error al hacer la eliminación',error
            })
        }
    })

app.listen(PORT, (e) => {
    e
        ? console.error('No se ha podido iniciar el servidor')
        : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

})