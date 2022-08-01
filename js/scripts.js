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
//this makes a list of pokemons
pokemonList.forEach(function(pokemon){
  if (pokemon.height >= 2) {
    document.write(pokemon.name + " (height: " + pokemon.height +")" + " - Wow, a big pokemon!<br>");
  }else {
  document.write(pokemon.name + " (height: " + pokemon.height +")<br>");

}
});
//Previous code using for loop
/*
for (let i=0; i<pokemonList.length; i++) {
if (pokemonList[i].height >= 2) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height +")" + " - Wow, a big pokemon!");
  document.write("<br>");
}else {
document.write(pokemonList[i].name + " (height: " + pokemonList[i].height +")");
document.write("<br>");
}
}
*/
