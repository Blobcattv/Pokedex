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
    }
];

pokemonList.forEach((pokemon) => {
    document.writeln(`${pokemon.name} is ${pokemon.height} meters high. And is of type ${pokemon.type}.`);
});