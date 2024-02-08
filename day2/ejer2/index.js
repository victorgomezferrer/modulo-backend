const express = require('express')
const app = express()
app.listen(3000)

app.get('/:numero', function(request, response) {
let numero = request.params.numero
response.send('este es el numero '+ Math.floor(Math.random()*numero))
});