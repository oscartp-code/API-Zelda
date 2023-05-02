const charactersContainer = document.querySelector('.characters-container');
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

let offset = 1;
let limit = 8;

previous.addEventListener('click', () => {
    if(offset != 1) {
        offset =9;
        removeChilNodes(charactersContainer)
        fetchCharacters(offset,limit)
    }
   
})
next.addEventListener('click', () => {
    offset =40;
    removeChilNodes(charactersContainer)
    fetchCharacters(offset,limit)
})

function fetchCharacter(id) {
    fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${id}`)
    .then(response => response.json())
    .then(data => {
        createCharacter(data)
        spinner.style.display = "none"

    })
}

function fetchCharacters(offset,limit) {
    spinner.style.display = "block"
    for(let i = offset; i<=offset + limit; i++) {
        fetchCharacter(i)
    }
}

function createCharacter(character) {
    const card = document.createElement('DIV')
    card.classList.add('character-block')

    const imgContainer = document.createElement('DIV')
    imgContainer.classList.add('img-container')
 
    const img = document.createElement('IMG');
    img.src = character.data.image

    imgContainer.appendChild(img)

    const name  = document.createElement('P')
    name.classList.add('name')
    name.textContent = character.data.name

    
    
    card.appendChild(imgContainer)
    card.appendChild(name)
    

    charactersContainer.appendChild(card)
}

function removeChilNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

fetchCharacters(offset,limit)