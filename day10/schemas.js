let mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un requisito']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es un requisito']
    },
    dni: {
        type: String,
        required: [true, 'El dni es un requisito']
    },

})

const habitacionSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: [true, 'El numb de habitacion es un requisito']
    },
    estado: {
        type: String,
        required: [true, 'El estado es un requisito']
    },
 

})

const reservasSchema = new mongoose.Schema({
    cliente: {
       type: String,
       ref: 'Cliente'
    },
    habitacion: {
        type:String,
        ref: 'Habitacion' 
    },
    fechaCheckin: {
        type: String,
        required: [true, 'La fecha de checkin es un requisito']
    },
    fechaCheckout: {
        type: String,
        required: [true, 'La fecha de checkout es un requisito']
    },
})



let Cliente = mongoose.model('cliente', clienteSchema)
let Habitacion = mongoose.model('habitacion', habitacionSchema)
let Reservas = mongoose.model('reservas', reservasSchema)

module.exports = {Cliente, Habitacion, Reservas}