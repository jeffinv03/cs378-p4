document.addEventListener("DOMContentLoaded", () => {
    const fireBtn = document.getElementById("fireBtn");
    const waterBtn = document.getElementById("waterBtn");
    const grassBtn = document.getElementById("grassBtn");
    const pokemonInput = document.getElementById("pokemonInput");
    const searchBtn = document.getElementById("searchBtn");
    const pokemonData = document.getElementById("pokemonData");

    const baseURL = "https://pokeapi.co/api/v2";

    // Function to fetch Pokemon data based on type
    const fetchDataByType = async (type) => {
        try {
            const response = await fetch(`${baseURL}/type/${type}`);
            const data = await response.json();
            console.log("Type Data:", data); // Log the response data
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    };

    // Function to fetch Pokemon data by name
    // Function to fetch Pokemon data by name
    const fetchDataByName = async (name) => {
        try {
            const response = await fetch(`${baseURL}/pokemon/${name}`);
            const data = await response.json();
            console.log("Name Data:", data); // Log the response data
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    };


    // Function to display Pokemon data
    // Function to display Pokemon data
    // Function to display Pokemon data
    const displayPokemonData = (data) => {
        pokemonData.innerHTML = "";
        if (data) {
            const pokemonList = document.createElement("ul");
            if (Array.isArray(data)) {
                data.forEach((pokemon) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = pokemon.name;
                    pokemonList.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement("li");
                const types = data.types.map(typeObj => typeObj.type.name).join(", ");
                listItem.textContent = `${data.name} (${types})`;
                pokemonList.appendChild(listItem);
            }
            pokemonData.appendChild(pokemonList);
        } else {
            pokemonData.textContent = "No data available.";
        }
    };



    // Event listeners for button clicks
    fireBtn.addEventListener("click", async () => {
        const data = await fetchDataByType("fire");
        const pokemonList = data.pokemon.map(pokemon => pokemon.pokemon);
        displayPokemonData(pokemonList);
    });

    waterBtn.addEventListener("click", async () => {
        const data = await fetchDataByType("water");
        const pokemonList = data.pokemon.map(pokemon => pokemon.pokemon);
        displayPokemonData(pokemonList);
    });

    grassBtn.addEventListener("click", async () => {
        const data = await fetchDataByType("grass");
        // Extract the array of Pokémon objects from the response
        const pokemonList = data.pokemon.map(pokemon => pokemon.pokemon);
        displayPokemonData(pokemonList);
    });

    searchBtn.addEventListener("click", async () => {
        const name = pokemonInput.value.toLowerCase();
        const data = await fetchDataByName(name);
        if (data) {
            if (data.types) {
                // If the data has types, extract the names and display them along with the Pokémon's name
                const types = data.types.map(typeObj => typeObj.type.name);
                data.name = `${data.name} (${types.join(", ")})`;
                displayPokemonData([data]); // Wrap the single Pokémon object in an array for consistency
            } else {
                displayPokemonData([{ name: data.name }]); // Wrap the single Pokémon object in an array for consistency
            }
        } else {
            pokemonData.textContent = `Could not find data for ${name}.`;
        }
    });
    
});

