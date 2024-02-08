const express =  require('express')
const router = express.Router()

let { Cliente} = require('../schemas')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.get('/', async (req, res) => {
    try {
        let results = await Cliente.find({})
        res.send({ mensaje: "Se ha encontrado estos clientes en el documento", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

router.post('/', async (req, res) => {
    try {
        let { nombre, apellido, dni } = req.body

        let results = await Cliente.create({
            nombre: nombre,
            apellido: apellido,
            dni: dni
        })
        res.send({ mensaje: "Se ha actualizado el documento", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

router.put('/', async (req, res) => {
    try {
        let { nombre, apellido, dni } = req.body

        let results = await Cliente.updateOne({dni: dni},{ nombre: nombre,
            apellido: apellido,})
        res.send({ mensaje: "Se ha actualizado el documento", results })
    }
    catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

module.exports = router