const express = require('express')
const app = express()
const port = process.env.PORT || 3001

let fs = require('fs')
const fileUpload = require('express-fileupload')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/fotosJuanito', express.static('fotosJuanito'));

app.use(fileUpload({ createParentPath: true }))
app.use(express.static('public'))

app.get('/imagenes',(req,res)=>{
    fs.readdir('./fotosJuanito',(err,data)=>{
        if (err){ res.send('error',err)}
        else {
            let urlFinal= data.map((url)=>{return {
                url:`fotosJuanito/${url}`,
                ruta:`http://localhost:3001/fotosJuanito/${url}`
            }})
          
        res.send(urlFinal)
        }
    
    })
})


app.post('/subir', (req, res) => {
    if (!req.files) { res.send({ mensaje: "No hay archivo" }) }
    else {
        let file = req.files.archivo
        let md5= file.md5
        file.mv('./fotosJuanito/'+md5+file.name)
        res.send({
            status: true,
            message: 'Fichero subido'
            ,

            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size,
            },
        })
    }
})

app.post('/descarga',(req,res)=>{
   
   let archivoDescargar = req.body.url
  
    res.download(archivoDescargar)
})

app.delete('/borrar',(req,res)=>{
    let rutaBorrar= req.body.url
    console.log(rutaBorrar)
      fs.unlink(rutaBorrar,(err)=>{
        err
        ? res.send('Error')
        :res.send('Archivo borrado')
    })  
})

app.listen(port, err => {
    err
        ? console.error(err)
        : console.log(`Servidor iniciado en http://localhost: ${port}`)
})