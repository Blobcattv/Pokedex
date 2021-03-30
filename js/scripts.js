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

for (let i = 0; i < pokemonList.length; i++) {
    const pkm = pokemonList[i];
    let output = `${pkm.name} is ${pkm.height} meters high.`
    if (pkm.height > 1.0) {
        output = output + " - Wow! Thats huge.";
    }
    if (pkm.height < 0.3) {
        output = output + " - So tiny!";
    }
    document.write(output + "<br>");
}