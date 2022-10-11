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
  printElements(document, pokemons);
}
function printElements(document, pokemons) {
  const nextButton = document.createElement('button');
  const prevButton = document.createElement('button');
  if (!nextUrl) { nextButton.setAttribute('disabled', true); }
  if (!prevUrl) { prevButton.setAttribute('disabled', true); }
  nextButton.innerHTML = 'next >';
  prevButton.innerHTML = '< previous';
  nextButton.addEventListener('click', nextPage)
  prevButton.addEventListener('click', prevPage)
  pokemons.forEach(pokemon => {
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
        card.addEventListener('click', () => {
          const modal = document.createElement('div');
          const modalContent = document.createElement('div');
          const closeModal = document.createElement('span');
          modal.className = "modal";
          modalContent.className = "modal__content";
          closeModal.className = "close";
          closeModal.innerHTML = '&times;';
          modal.style.display = 'block';
          document.body.append(modal);
          modal.append(modalContent);
          const modalImg = document.createElement('img');
          const modalName = document.createElement('p');
          modalName.innerHTML = pokemon.name.toUpperCase();
          modalImg.src = pokemonData.sprites.other.dream_world.front_default;
          modalContent.append(closeModal);
          modalContent.append(modalImg);
          modalContent.append(modalName);
          closeModal.onclick = function () {
            modal.style.display = 'none';
          }
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = 'none';
            }
          }
          pokemonData.abilities.forEach(element =>{
            const abilityName = document.createElement('p');
            abilityName.innerHTML = element.ability.name;
            modalContent.append(abilityName);
          })
        });
        
      })
  });
  buttonspace.append(prevButton, nextButton);
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













