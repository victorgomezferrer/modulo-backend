const express = require('express')
const app = express()
app.listen(3000)

let persona = {
    nombre: 'paco',
    apellidos: 'gomez',
    edad: 45,
}

app.get('/persona/:nombre', function (request, response) {
    persona.nombre = request.params.nombre
    response.send(persona);
});
