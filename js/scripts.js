let pokemonRepository = (function () {

    let pokemonRawDataList = [];
    let pokemonList = {};
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon !== "object") {
            console.log("Not a pokemon, please try again");
            return;
        }
        pokemonRawDataList.push(pokemon);
    }

    function getAll() {
        return pokemonRawDataList;
    }


    function addListItem(pkm) {
        let mainList = document.querySelector('.pokemon-list');
        let button = document.createElement('div');
        button.classList.add('pkm-btn');

        let buttonTitle = document.createElement('h3');
        buttonTitle.innerText = pkm.name;

        loadDetails(pkm).then(function () {
            let typeName = pkm.types[0].type.name;
            let colorCode = calcColorByType(typeName);

            button.style.backgroundColor = colorCode;
            let imgElement = document.createElement("img");
            imgElement.src = pkm.imageUrl;

            // Append
            button.appendChild(buttonTitle);
            button.appendChild(imgElement);            
            mainList.appendChild(button);
        });

        button.addEventListener('click', function (event) {
            showDetails(pkm.id);
        });
    };

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pkm) {
        let url = pkm.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pkm.id = details.id;
            pkm.imageUrl = details.sprites.front_default;
            pkm.height = details.height;
            pkm.types = details.types;
            pkm.weight = details.weight;
            pkm.abilities = details.abilities;

            pokemonList[pkm.id] = pkm;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pkmId) {
        let pokemon = pokemonList[pkmId];
        if (!pokemon) {
            console.error("Pokemon " + pkmId + " is not available");
            return;
        }
        showModal(pokemon);
    }


    let modalContainer = document.querySelector('#modal-container');
    function showModal(pokemon) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        let typeName = pokemon.types[0].type.name;
        modal.style.backgroundColor = calcColorByType(typeName);
        modal.classList.add('pkm-modal');

        // Close Modal
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('pkm-modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        modal.appendChild(closeButtonElement);

        // Pokemon Name
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
        modal.appendChild(titleElement);

        // Pokemon Image
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        modal.appendChild(imageElement);

        // Pokemon Type
        for (let typeObj of pokemon.types) {
            let typeElement = document.createElement("p");
            typeElement.innerText = typeObj.type.name;
            modal.appendChild(typeElement);
        }

        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };


})();

function calcColorByType(type) {
    let typeToColorMapping = {
        normal: "#A8A878",
        fire: "#F08030",
        fighting: "#C03028",
        water: "#6890F0",
        flying: "#A890F0",
        grass: "#78C850",
        poison: "#A040A0",
        electric: "#F8D030",
        ground: "#E0C068",
        psychic: "#F85888",
        rock: "#B8A038",
        ice: "#98D8D8",
        bug: "#A8B820",
        dragon: "#7038F8",
        ghost: "#705898",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "#EE99AC"
    };
    let formattedType = type.toLowerCase();
    let colorCode = typeToColorMapping[formattedType];
    if (!colorCode) {
        return "red";
    }
    return colorCode;
}

let pokemonList = pokemonRepository.getAll();

pokemonRepository.loadList().then(function () {
    pokemonList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
}).then(function () {
    let header = document.querySelector("#pokedex-header");
    header.innerText = header.innerText + " of " + pokemonList.length + " Pokémons ";
});