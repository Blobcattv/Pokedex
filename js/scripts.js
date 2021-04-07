let pokemonRepository = (function () {


    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 0.7,
            type: ['grass', 'poison']
        },
        {
            name: "Snorlax",
            height: 2.1,
            type: ["normal"]
        },
        {
            name: "Psyduck",
            height: 0.8,
            type: ["water"]
        },
        {
            name: "Tynamo",
            height: 0.2,
            type: ["electric"]
        }
    ];

    function add(pokemon) {
        if (typeof pokemon !== "object") {
            console.log("not a pokemon, please try again");
            return;
        }
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }


    function addListItem(pokemon) {
        let mainList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pkm-btn');
        listItem.appendChild(button);
        mainList.appendChild(listItem);

        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    };

    function showDetails(pokemon) {
        console.log(pokemon);
    };


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };


})();

let pokemonList = pokemonRepository.getAll();
pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

