let express = require('express')
let mongoose = require('mongoose')
let app = express()
let port = process.env.PORT || 3001


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// exports del router
let rutasClientes = require('./rutas/rutasClientes')
// middlelware que envia las rutas que empiecen con /gestion a router previamente exportado en el require superior
app.use('/cliente', rutasClientes)

let rutasHabitaciones = require('./rutas/rutasHabitaciones')
app.use('/habitaciones', rutasHabitaciones)

let rutasReservas = require('./rutas/rutasReservas')
app.use('/reservas', rutasReservas)

mongoose.connect('mongodb://127.0.0.1:27017/hotel')
    .then((client)=>{console.log('🟢 MongoDB está conectado')})
    .catch(err => {
        console.log('🔴 MongoDB no conectado: ' + err)
    })


  




app.listen(port, (e) =>
    e
        ? console.log("Servidor fallido")
        : console.log("Servidor conectado en el puerto: " + port))
