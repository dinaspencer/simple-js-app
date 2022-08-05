let pokemonRepository = (function(){

//grab the data from external API
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//push the pokemon data into the empty array
function add(pokemon){
  pokemonList.push(pokemon);
}

//check that the data added is an object
function addv(pokemon){
  typeof(pokemon) == "object" ? add(pokemon) : "";
}

function getAll(){
  return pokemonList;
}


//to show details of each pokemon on button click
function showDetails(pokemon){
  loadDetails(pokemon).then(function(){
  //console.log(pokemon);

  //lets make modalContainer a global variable
  let modalContainer = document.querySelector('#modal-container');

  //here we create the modal because it will only be visible upon clicking buttons.
  function showModal(title, text, types, image){
  modalContainer.innerHTML = "";
  let modal = document.createElement('div');
  modal.classList.add('modal');
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'X';
  closeButtonElement.addEventListener('click', hideModal);

  //populate the modal element with 3 pieces of content
  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;


  let imageElement = document.createElement('img');
  imageElement.src = pokemon.imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

//call the function with details as parameters to make the modal appear
showModal(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrl);

//hides the modal after done
function hideModal(){
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) =>{
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
      }
    });
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
    addv: addv,
    showDetails: showDetails,
    getAll: getAll,
    addListItem: addListItem,
    buttonClick: buttonClick,
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
