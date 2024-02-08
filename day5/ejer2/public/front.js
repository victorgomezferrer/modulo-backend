
let divDatos = document.getElementById('personaje')
let randomNumber = Math.floor(Math.random() * 500)

console.log(randomNumber)
fetch(`https://api.disneyapi.dev/characters/${randomNumber}`)
    .then((resutadoEnTxt) => resutadoEnTxt.json())
    .then((resultadoEnJson) => {
        if (!resultadoEnJson.data.name) return alert('no existe el pj, refresca la pagina')
        else {
                divDatos.innerHTML = `   <h2>${resultadoEnJson.data.name}</h2>
                <h4>ID: ${resultadoEnJson.data._id}</h4>
                <p>${resultadoEnJson.data.films}</p>
                <img src="${resultadoEnJson.data.imageUrl}" alt="">`
        }
    })