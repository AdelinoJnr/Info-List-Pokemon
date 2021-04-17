/**/
const arrayPokemons = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

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

const eventClick = (event) => {
  console.log('clickei')
}

const createItemListPokemon = ({ name, types, id, sprites: { other: { dream_world } }}) => {
  const section = document.createElement('section');
  section.className = 'pokemonList';
  section.appendChild(createElements('p', name, 'name-pokemon'));
  section.appendChild(createElementImg(dream_world.front_default, 'img-pokemon'));
  section.appendChild(createElements('p', 'Mais detalhes...', 'btn-details'));
  section.addEventListener('click', eventClick);
  /*
  const link = createLinkElement('a', 'link-detalhes', 'https://www.youtube.com/?hl=pt&gl=BR');
  link.appendChild(section);
  */
  return section;
};

const createList = async () => {  
  arrayPokemons.forEach(async (pokemon) => {
    const namePokemon = pokemon.toLowerCase();
    const dados = await getData(namePokemon);
    const sectionGlobal = document.querySelector('.pokemons');
    sectionGlobal.appendChild(createItemListPokemon(dados));
  });
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
  sincro();
};
