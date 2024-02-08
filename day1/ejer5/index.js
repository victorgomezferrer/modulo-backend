let objeto = require('./datos')
const paises = objeto.objeto.paises.a.concat(objeto.objeto.paises.b, objeto.objeto.paises.c)
const paisesFavoritos = []
for (var i = 0; i < objeto.objeto.favoritos.length; i++) {
 paisesFavoritos.push(paises[objeto.objeto.favoritos[i]])
}

console.log(paisesFavoritos)