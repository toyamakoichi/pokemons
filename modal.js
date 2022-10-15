const modal = document.getElementById('modal__id');
const modalContent = document.querySelector('.modal__content');
const modalImg = document.querySelector('.modal__img');
const modalName = document.querySelector('.modal__name');
const modalAbilities = document.querySelector('.modal__abilities');
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    modalAbilities.innerHTML = '';
  }
}
function getAbility(url, abilityName)
{
  fetch(url)
    .then(response => response.json())
    .then(data => printAbility(data, abilityName));
}
function printAbility(abilityData, abilityName)
{
  const modalAbility = document.createElement('p');
  modalAbility.innerHTML = abilityName;
  const modalDesc = document.createElement('h4');
  abilityData.effect_entries.forEach(el => {
    if(el.language.name === 'en'){modalDesc.innerHTML = el.effect;}
  })
  modalAbilities.append(modalAbility);
  modalAbilities.append(modalDesc);
}

function printModal(pokemonData, img, name) {
  modal.style.display = 'block';
  modalImg.src = img;
  modalName.innerHTML = name.toUpperCase();
  pokemonData.abilities.forEach(skill => {
    getAbility(skill.ability.url, skill.ability.name);
  });

}