const express = require('express')
const app = express()
app.listen(3000)

let curso = ['Antonio','Ester','Gloria','Maria','Mildry','Marina','Santiago','Victor']



app.get('/personas/:nombre', function (request, response) {
    curso.push(request.params.nombre)
    response.send(curso);
});