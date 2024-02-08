let input = document.getElementById('numero')

function pedir(){

    fetch(`https://xkcd.com/${input}/info.0.json`,{
        header:{
            "Accept": "",
            "User-Agent": 'Thunder Client (https://www.thunderclient.com)'
        }
    })
    .then((respuestaEnTxt)=> respuestaEnTxt.json())
    .then((respuestaEnObjeto)=>{
    console.log(respuestaEnObjeto)
    })

}


