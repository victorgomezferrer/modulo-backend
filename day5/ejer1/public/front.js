let booksDiv = document.getElementById('list-th')

fetch(`https://gutendex.com/books/`)
    .then((resEnTxt) => resEnTxt.json())
    .then((res) => {
        console.log(res)
        res.results.forEach(({ title, authors, formats})=> {
           
            booksDiv.innerHTML +=
                `
<div class="book read">
<div class="cover">
    <img src="${formats["image/jpeg"]}">
</div>
<div class="description">
    <p class="title">${title}</br>
        <span class="author">${authors[0].name}</span>
    </p>
</div>
</div>
`
        });



    })


