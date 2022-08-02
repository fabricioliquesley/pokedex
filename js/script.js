const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonVoltar = document.querySelector('.btn-prev');
const buttonProximo = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderpokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;

        input.value = '';
    }
    else {
        pokemonName.innerHTML = 'Não encontrado :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none'

        input.value = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderpokemon(input.value.toLowerCase());
});

buttonVoltar.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderpokemon(searchPokemon)
    }
});
buttonProximo.addEventListener('click', () => {
    searchPokemon += 1;
    renderpokemon(searchPokemon)
});

renderpokemon(searchPokemon);