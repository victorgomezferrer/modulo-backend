const express =  require('express')
const router = express.Router()

let {Habitacion} = require('../schemas')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.get('/', async (req, res) => {
    try {
        let results = await Habitacion.find({})
        res.send({ mensaje: "Se ha encontrado estas habitaciones en el documento", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

router.post('/', async (req, res) => {
    try {
        let {numero, estado} = req.body

        let results = await Habitacion.create({
            numero: numero,
            estado:estado,
           
        })
        res.send({ mensaje: "Se ha actualizado el documento", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

module.exports = router