const nombres = ['Juan','Maria','Pepe','Antonio','Teresa']

const express = require('express')
const app = express()
app.listen(3000)

app.get('/persona', function(request, response) {

response.send('Estas son todas las personas ' + nombres);
});

app.get('/persona/:nombre', function(request, response) {

    let nombre = request.params.nombre;
    response.send('Estas buscandop a ' + nombre);
    });