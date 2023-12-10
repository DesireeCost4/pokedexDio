const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 200
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
 // Nova Função - Desafio DIO// 
function filterPokemon(term) {
    const pokemonElements = pokemonList.querySelectorAll('.pokemon');

    pokemonElements.forEach((pokemonElement) => {
        const nameElement = pokemonElement.querySelector('.name');
        const pokemonName = nameElement.textContent.toLowerCase();

        if (pokemonName.includes(term)) {
            pokemonElement.style.display = 'block'; 
        } else {
            pokemonElement.style.display = 'none';   
        }
    });
}


searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filterPokemon(searchTerm);
});

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterPokemon(searchTerm);
    }
});








