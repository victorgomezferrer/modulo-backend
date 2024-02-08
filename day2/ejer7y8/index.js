const express = require('express')
const app = express()
app.listen(3000)

const ceros = require('./array')
const funcion = require('./funcion')

app.get('/', function (request, response) {
    ceros[funcion()] += 1
    response.send(ceros)
});

app.get('/borrar/:numero', function (request, response) {
    ceros[request.params.numero] = 0 
    response.send(ceros)
});