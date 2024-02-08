const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
})
connection.connect(function (err) {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa con el ID: ' + connection.threadId);
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/menus', (req, res) => {
    connection.query('SELECT * FROM `menus` WHERE numMenu = ?;',[1], (err, results) => {
        err
            ? res.send({ mensaje: "No se ha podido realizar la consulta" })
            : results.length > 0
                ? res.send({ mensaje: "Consulta realizada", results })
                : res.send({ mensaje: "Consulta realizada sin resultados", results })
    })
})






app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})