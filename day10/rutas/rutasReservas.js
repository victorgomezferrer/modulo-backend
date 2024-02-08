const express = require('express')
const router = express.Router()

let { Reservas, Cliente, Habitacion } = require('../schemas')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.get('/', async (req, res) => {
    try {
        let results = await Reservas.find({})
        res.send({ mensaje: "Se ha encontrado estas reservas en el documento", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

router.post('/checkin', async (req, res) => {
    try {

        let { cliente, habitacion, fechaCheckin, fechaCheckout } = req.body
        let busquedaDni = await Cliente.find({ dni: cliente })
        if (busquedaDni.length > 0) {
            console.log(busquedaDni)
            let busquedaHabitacion = await Habitacion.find({ numero: habitacion, estado: "Libre" })
            if (busquedaHabitacion.length > 0) {
                let results = await Reservas.create({
                    cliente,
                    habitacion,
                    fechaCheckin,
                    fechaCheckout

                })
                let ocuparHabitacion = await Habitacion.findOneAndUpdate({numero: habitacion},{estado:"Ocupada"})
                res.send({ mensaje: "Se ha creado la reserva y se ha modificado la habitascion a OCUPADA", results ,ocuparHabitacion})
            }
            else res.send({mensaje: "la habitacion esta ocupada", busquedaHabitacion})
        }
        else { res.send({ mensaje: 'No se ha podido crear la reserva por que el usuario no esta registrado' }) }
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

router.put('/checkout',async(req,res)=>{
    try {
        let {dni}= req.body
      
        let idCheck = await Cliente.find({dni:dni})
        if(idCheck.length>0){
            let modificarReserva= await Reservas.findOneAndUpdate({cliente:dni},{fechaCheckout: new Date})
            let modificarHabitacion= await Habitacion.findOneAndUpdate({numero:modificarReserva.habitacion},{estado:"Libre"})
            res.send({mensaje:"Checkout listo",modificarReserva,modificarHabitacion})
        }else {
            res.send({mensaje:"El id no esta registrado", idCheck})
        }
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})


module.exports = router