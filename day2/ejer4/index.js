const express = require('express')
const app = express()
app.listen(3000)

const saludar = require('./archivo')

app.get('/', function(request, response) {
    response.send(saludar());
    });