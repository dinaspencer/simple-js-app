let pokemonRepository = (function() {
  //grab the data from external API
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //push the pokemon data into the empty array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //check that the data added is an object
  function addv(pokemon) {
    typeof pokemon == "object" ? add(pokemon) : "";
  }

  function getAll() {
    return pokemonList;
  }

  //to show details of each pokemon on button click
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      //console.log(pokemon);
      showModal(pokemon);
    });
  }
  //button event listener function
  function buttonClick(pokemonButton, pokemon) {
    pokemonButton.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  //builds the buttons to be clicked for each pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("col", "col-lg-4", "col-md-6");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn-primary", "btn");
    //button.classList.add('btn');
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#exampleModal");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    buttonClick(button, pokemon);
  }
  //gets the data from the API and loads onto page
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  //loads details for each pokemon on button click (showDetails)
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(details.abilities[i].ability.name);
        }
        pokemon.types = [];
        for (var i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  //show the modal content (using Bootstrap + vanilla JS)
  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");

    modalBody.innerHTML = "";
    modalTitle.innerHTML = "";

    let nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;
    let imageElementFront = document.createElement("img");
    imageElementFront.src = pokemon.imageUrlFront;
    imageElementFront.classList.add("modal-image");
    let imageElementBack = document.createElement("img");
    imageElementBack.src = pokemon.imageUrlBack;
    imageElementBack.classList.add("modal-image");
    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;
    let weightElement = document.createElement("p");
    weightElement.innerText = "Weight: " + pokemon.weight;
    let typesElement = document.createElement("p");
    typesElement.innerText = "Types: " + pokemon.types;
    let abilitiesElement = document.createElement("p");
    abilitiesElement.innerText = "Abilities: " + pokemon.abilities;

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElementFront);
    modalBody.appendChild(imageElementBack);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(abilitiesElement);
  }

  return {
    add: add,
    addv: addv,
    showDetails: showDetails,
    getAll: getAll,
    addListItem: addListItem,
    buttonClick: buttonClick,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

//loading the list of pokemons from api using promise function
pokemonRepository.loadList().then(function() {
  //changing pokemonList to pokemonRepository.getAll() allows me to access the pokemon array and iterate over each item

  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
