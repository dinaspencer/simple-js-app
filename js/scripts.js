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

function getAll(){
  return pokemonList;
}

  return {
    add: add,
    getAll: getAll
  };
})();

//changing pokemonList to pokemonRepository.getAll() allows me to access the pokemon array and iterate over each item
  pokemonRepository.getAll().forEach(function(pokemon){
  if (pokemon.height >= 2) {
    document.write(pokemon.name + " (height: " + pokemon.height +")" + " - Wow, a big pokemon!<br>");
  }else {
  document.write(pokemon.name + " (height: " + pokemon.height +")<br>");

}
});
