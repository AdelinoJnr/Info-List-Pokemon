/**/
const arrayPokemons = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidorina","Nidoqueen","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

const createElements = (element, text, className) => {
  const elemento = document.createElement(element);
  elemento.innerText = text;
  elemento.className = className;
  return elemento;
};

const createElementImg = (src, className) => {
  const elemento = document.createElement('img');
  elemento.className = className;
  elemento.src = src;
  return elemento;
}

const createLinkElement = (element, className, href) => {
  const link = document.createElement(element);
  link.href = href;
  link.className = className;
  link.target = '_blank';
  return link;
};

const buscaDoPokemon = (item) => {
  return item.querySelector('p.name-pokemon').innerText;
};

const createDivDetalhes = async (namePokemon, element) => {
  const dados = await getData(namePokemon);
  const { base_experience, height, weight, types, name, abilities } = dados;
  let typesPokemon = [];
  types.forEach((tipo) => {
    typesPokemon.push(tipo.type.name);
  });
  let habilidadesPokemon = [];
  abilities.forEach((skill) => {
    habilidadesPokemon.push(skill.ability.name);
  });;
  const div = document.createElement('div');
  div.className = 'content-detalhes'
  div.appendChild(createElements('p', `Nome: ${name}`, 'name-pokemon'));
  div.appendChild(createElements('p', `Base de Experiencia: ${base_experience}`, 'name-pokemon'));
  div.appendChild(createElements('p', `Altura: ${height} | Largura: ${weight}`, 'name-pokemon'));
  div.appendChild(createElements('p', `Tipos: ${typesPokemon.join(' | ')}`, 'name-pokemon'));
  div.appendChild(createElements('p', `Habilidades: ${habilidadesPokemon.join(' | ')}`, 'name-pokemon'));  
  element.parentNode.appendChild(div)
  console.log(dados);
};

const painelDetalhes = (element) => {
  element.parentNode.style.width = '500px';
  element.parentNode.style.height = '500px';
  element.parentNode.style.display = 'block';
  element.parentNode.style.padding = '20px 0 0 0px';
  element.style.display = 'none';
  element.parentNode.style.cursor = 'pointer';
  const namePokemon = buscaDoPokemon(element.parentNode);
  createDivDetalhes(namePokemon, element);
};

const eventClick = (event) => {
  const pokemon = event.target
  painelDetalhes(pokemon)

  /*
  pokemon.parentNode.addEventListener('click', () => {
    window.location = "index.html"
  });
  */
}

//
const createItemListPokemon = ({ name, types, id, sprites: { other: { dream_world } }}) => {
  const section = document.createElement('section');
  section.className = 'pokemonList';
  section.appendChild(createElements('p', name, 'name-pokemon'));
  section.appendChild(createElementImg(dream_world.front_default, 'img-pokemon'));
  const detalhes = createElements('p', 'Mais detalhes...', 'btn-details');
  detalhes.addEventListener('click', eventClick);
  section.appendChild(detalhes);
  return section;
};

// Cria pokemons em sections e adiciona no DOM
const createList = async () => {  
  arrayPokemons.forEach(async (pokemon) => {
    try {
      const namePokemon = pokemon.toLowerCase();
      const dados = await getData(namePokemon);
      const sectionGlobal = document.querySelector('.pokemons');
      sectionGlobal.appendChild(createItemListPokemon(dados));
    } catch (error) {
      console.log('Não achei nada');
    }
  });
};

// Remove o loading quando a busca da API for finalizada
const removeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove()
};

/*
const createOptions = () => {
  arrayPokemons.forEach((pokemon, index) => {
    const option = document.createElement('option');
    option.innerHTML = pokemon
    option.value = index
    const select = document.querySelector('.form-select');
    select.appendChild(option);
  });
};
*/

const getData = async (pokemon) => {
  const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const dados = response.json();
  return dados;
};

const sincro = async () => {
  try {
    createList();
  } catch (error) {
    console.log('Não achei nada');
  }
};

window.onload = function () {
  setTimeout(() => {
    sincro(); 
    removeLoading();
  }, 0);
};
