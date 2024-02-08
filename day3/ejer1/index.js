let express = require('express')
let app = express()
const veterinario = require('./animales')



let listaAnimales = ""



function checkAnimales(){veterinario.forEach((animal) =>  listaAnimales +=`<form action="/adoptar"> <h2>${animal.nombre}</h2><ul><li>${animal.edad}</li><li>${animal.tipoDeAnimal}</li></ul> <button type="submit" name='nombre' value='${animal.nombre}' >Adoptar</button> </form>`);
}


app.get('/', function (request, response){
  checkAnimales()
    response.send(listaAnimales)
})

app.get('/sumar-animal', function(req, res) {
    const { nombre, tipo, edad } = req.query;
   
    const nuevoAnimal = { nombre, tipo, edad };

  veterinario.push(nuevoAnimal);
  checkAnimales()
  res.send(listaAnimales)
    });


    app.get('/dejar-animal', (req, res) => {
        const formularioHTML = `
          <form action="/sumar-animal">
            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" required><br>
      
            <label for="tipo">Tipo:</label>
            <input type="text" name="tipo" required><br>
      
            <label for="edad">Edad:</label>
            <input type="text" name="edad" required><br>
      
            <button type="submit">Añadir Animal</button>
          </form>
        `;
      
        res.send(formularioHTML);

    });


    app.get('/adoptar', (req, res) => {
       let nombre = req.query.nombre
       veterinario.forEach((animal,i) => {
        if(animal.nombre === nombre){
            veterinario.splice(i,1)
        }
       })
       checkAnimales()
        res.send(listaAnimales);

    });

app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error('No se ha podido iniciar el servidor')
    : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

} )