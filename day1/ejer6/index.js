let supervillains = require ("supervillains")
let factorial = require('./funciones')

for( let i=0; i<=3; i++) {
   console.log(supervillains.all[factorial(Math.floor(Math.random()*5)+1)])
    
}
