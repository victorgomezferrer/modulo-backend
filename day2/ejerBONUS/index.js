const almacen = require('./almacen')
let cesta = []

const express = require('express')
const app = express()
app.listen(3000)

app.get('/:carniceria',function(req,res){
    for (tienda of almacen.objet){
       if(Object.keys(tienda) === req.params.carniceria){
        res.send(tienda)
       }
    }
})

app.get('/:pescaderia',function(req,res){
    for (tienda of almacen.objet){
       if(Object.keys(tienda) === req.params.pescaderia){
        res.send(tienda)
       }
    }
})
app.get('/:fruteria',function(req,res){
    for (tienda of almacen.objet){
       if(Object.keys(tienda) === req.params.fruteria){
        res.send(tienda)
       }
    }
})

app.get('/cesta',function(req,res){
    for (tienda of almacen.objet){
  
        res.send(cesta)
       
    }
})


// SERIA POSIBLE? 
// app.get('/:`${departamento}`',function(req,res){
//     for (tienda of almacen.objet){
//        if(Object.keys(tienda) === req.params.`${departamento}`){
//         res.send(tienda)
//        }
//     }
// })



