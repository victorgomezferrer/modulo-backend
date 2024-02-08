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

app.get('/api/menus', async (req, res) => {
    try {
        const results = await app.locals.db.collection('restaurante').find({}).toArray();
        res.send({ mensaje: "Documentos encontrados: " + results.length, results });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al hacer la consulta', error });
    }
});

app.post('/api/nuevoMenu', async (req, res) => {
    try {
        let { numMenu, primPlato, segPlato, poste, precio } = req.body;
        const results = await app.locals.db.collection('restaurante').insertOne({ numMenu, primPlato, segPlato, poste, precio })
        res.send({
            mensaje: "Documento insertado: " + results.insertedId, results
        })
    }
    catch (error) {
        res.status(500).send({ mensaje: 'Error al hacer la consulta', error })
    }
});

app.put('/api/editarMenu', async (req, res) => {
    let { numMenu, primPlato, segPlato, poste, precio } = req.body;
    try {
        const results = await app.locals.db.collection('restaurante').updateOne({ numMenu: numMenu },{ $set: {primPlato, segPlato, poste, precio  } }
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

app.delete('/api/borrarMenu', async (req,res)=>{
    let {numMenu} = req.body
    try {
        const results = await app.locals.db.collection('restaurante').deleteOne({numMenu: numMenu})
        res.send({
            mensaje: "Documento eliminado: " + results.modifiedCount,
            results
        })
    }
    catch(error){
        res.status(500).send({  mensaje: 'Error al hacer la modificación', error})
    }

})


app.listen(PORT, (e) => {
    e
        ? console.error('No se ha podido iniciar el servidor')
        : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

})