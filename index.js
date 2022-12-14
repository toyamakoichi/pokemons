const space = document.querySelector('#space');
const buttonspace = document.querySelector('#buttonspace');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
let nextUrl, prevUrl;
getData(baseUrl);
function getData(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setData(data);
    });
}

function setData(data) {
  const { next, previous, results } = data;
  nextUrl = next;
  prevUrl = previous;
  const pokemons = results;
  printPage(document, pokemons);
}

function printPage(document, pokemons) {
  const nextButton = document.createElement('button');
  const prevButton = document.createElement('button');
  if (!nextUrl) { nextButton.setAttribute('disabled', true); }
  if (!prevUrl) { prevButton.setAttribute('disabled', true); }
  nextButton.innerHTML = 'next >';
  prevButton.innerHTML = '< previous';
  nextButton.addEventListener('click', nextPage)
  prevButton.addEventListener('click', prevPage)
  pokemons.forEach(pokemon => {
    printPokemon(pokemon);
  });
  buttonspace.append(prevButton, nextButton);
  };
  
function printPokemon(pokemon){
    const card = document.createElement('div');
    card.className = 'card';
    space.append(card);
    const name = document.createElement('p');
    name.innerHTML = pokemon.name.toUpperCase();
    fetch(pokemon.url)
      .then(response => response.json())
      .then(pokemonData => {
        const img = document.createElement('img');
        img.src = pokemonData.sprites.front_default;
        card.append(img);
        card.append(name);
        card.addEventListener('click', ()=>{
          printModal(pokemonData, img.src, pokemon.name);
        })
  })
}

function clearPage() {
  space.innerHTML = '';
  buttonspace.innerHTML = '';
}
function nextPage() {
  getData(nextUrl);
  clearPage();
}

function prevPage() {
  getData(prevUrl);
  clearPage();
}













