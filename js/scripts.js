let pokemonRepository = (function(){


let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
  loadDetails(pokemon).then(function(){
  console.log(pokemon);
  });
}
//button event listener function
function buttonClick(pokemonButton, pokemon){
  pokemonButton.addEventListener('click', function(){
    showDetails(pokemon);
  })
}
//builds the buttons to be clicked for each pokemon
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
//gets the data from the API and loads onto page
function loadList(){
  return fetch(apiUrl).then(function(response){
    return response.json();
  }).then(function(json){
    json.results.forEach(function(item){
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function(e){
    console.error(e);
  })
}
//loads details for each pokemon on button click (showDetails)
function loadDetails(pokemon){
  let url = pokemon.detailsUrl;
  return fetch(url).then(function(response){
    return response.json();
  }).then(function(details){
    pokemon.imageUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.types = details.types;
  }).catch(function(e){
    console.error(e);
  });
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//loading the list of pokemons from api using promise function
pokemonRepository.loadList().then(function(){

//changing pokemonList to pokemonRepository.getAll() allows me to access the pokemon array and iterate over each item

  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
