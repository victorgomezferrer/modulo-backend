let express = require('express')
let app = express()

let personas = require('./personas')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'))



app.get('/personas', function (request, response) {
    response.send(personas)

})

app.post('/sumar', function (request, response) {
    let { nombre, apellido, edad } = request.body

    personas.push({ nombre, apellido, edad })
    response.send(personas)
})

app.put('/modificar', function (request, response) {
    let { nombre, apellido, edad } = request.body
    personas.forEach(persona=>{
        if(persona.nombre === nombre) {
            persona.apellido = apellido;
            persona.edad= edad;
        }
    })
    
    response.send(personas)
})

app.delete('/eliminar', function (request, response) {
    let{ nombre } = request.body
    personas.filter(persona=>{
        if(persona.nombre === nombre) {
         return false
        }
        return true
    })
    
    response.send(personas)
})







app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error('No se ha podido iniciar el servidor')
        : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

})