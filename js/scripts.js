let pokemonRepository = (function(){


let pokemonList = [
  {name: 'Venusaur', height: 2, type: ['grass', 'poison']},
  {name: 'Butterfree', height: 1, type: ['bug', 'flying']},
  {name: 'Sandslash', height: 1.1, type: 'ground'},
  {name: 'Psyduck', height: 0.8, type: 'water'},
  {name: 'Slowpoke', height: 1.2, type: ['psychic', 'water']},
  {name: 'Quilava', height: 0.9, type: 'fire'},
  {name: 'Breloom', height: 1.2, type: ['grass', 'fighting']},
  {name: 'Misdreavus', height: 0.7, type: 'ghost'}
];

function add(pokemon){
  pokemonList.push(pokemon);
}

function addv(pokemon){
  typeof(pokemon) == "object" ? add(pokemon) : "";
}

function getAll(){
  return pokemonList;
}

//to show details of each pokemon on button click
function showDetails(pokemon){
  console.log(pokemon);
}
//button event listener function
function buttonClick(pokemonButton, pokemon){
  pokemonButton.addEventListener('click', function(){
    showDetails(pokemon);
  })
}

function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("pokemon-button");
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
  buttonClick(button, pokemon);
}



  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem
  };
})();

//changing pokemonList to pokemonRepository.getAll() allows me to access the pokemon array and iterate over each item

  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);

});
