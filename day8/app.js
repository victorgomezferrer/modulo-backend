let express = require('express')
let mongoose = require('mongoose')
let app = express()
let port = process.env.PORT || 3000
let cors = require('cors')
let Usuario = require('./schemas')
const bycrypt = require('bcrypt')

const corsConfig = {
    // origin: '',
    methods: 'PUT,POST,DELETE,OPTIONS'
} 
app.use(cors(corsConfig))
app.use(ipCheck)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/')
    .then(console.log('🟢 MongoDB está conectado'))
    .catch(err => {
        console.log('🔴 MongoDB no conectado: ' + err)
    })



app.get('/usuarios',async(req,res)=>{
    try {
        let results = await Usuario.find({})
        res.send({ mensaje: "Se ha completado la petición", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})


app.post('/usuarios',async(req,res)=>{
    try {
        let {nombre , email, password} = req.body
        password = bycrypt.hashSync(password,10)
        let results = await Usuario.create({nombre , email, password})
        res.send({ mensaje: "Se ha completado la petición", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.post('/usuariosLogin',async(req,res)=>{
    try {
        let {email, password} = req.body
       
        let results = await Usuario.find({email:email})
            if(results.length>0){
                console.log('Usuario encontrado', password, results[0].password)
                bycrypt.compareSync(password,results[0].password)
                ? res.send({ mensaje: 'Logueado correctamente' })
                : res.send({ mensaje: 'Contraseña incorrecta' })
            }
            else {res.send({mensaje:'Usuario no encontrado'})}
        
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.put('/usuarios', async(req,res)=>{
    try{
        let{email, nombre} = req.body
        let results =  await Usuario.findOneAndUpdate({email: email},{nombre:nombre})
        res.send({ mensaje: "Se ha completado la petición", results })
    }
        catch (error) {
            res.send({ mensaje: "No se ha podido completar la petición", error })
        }
    })
    
    app.delete('/usuarios',async(req,res)=>{
        try{
           let email = req.body.email
            let results = await Usuario.deleteOne({email:email})
            res.send({ mensaje: "Se ha completado la petición", results })
        }
        catch (error) {
            res.send({ mensaje: "No se ha podido completar la petición", error })
        }
    })

function ipCheck(req,res,next){
    console.log(req.ip, req.originalUrl)
    next()
}

app.listen(port, (e) =>
    e
        ? console.log("Servidor fallido")
        : console.log("Servidor conectado en el puerto: " + port))
