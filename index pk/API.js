const buscar = document.getElementById("busca");
const button = document.getElementById("button");
const imgs = document.getElementById("imgs");
const errorMessage = document.getElementById("error-message");
const consoleDiv = document.getElementById("console-log");
 

const originalConsoleLog = console.log;

console.log = function (...args) {
  originalConsoleLog.apply(console, args); 
  const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  consoleDiv.appendChild(newMessage);

};
 


async function Buscarpokemon(nome) {
  try {



    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Pokémon não encontrado");

    }
 
    const data = await response.json();
    imgs.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    imgs.alt = nome;
    errorMessage.style.display = "none";
 
    consoleDiv.innerHTML = "";
    console.log(`Pokémon encontrado: ${nome} (${data.types[0].type.name})`);

  } catch (error) {
    imgs.src = "";
    imgs.alt = "Imagem não disponível";
    errorMessage.style.display = "none";
    consoleDiv.innerHTML = "";
    console.log("Erro: Pokémon não encontrado.");
  }

}
 

button.addEventListener("click", function () {
  const pokemonNome = buscar.value.trim();
  if (pokemonNome) {
    Buscarpokemon(pokemonNome);
  }

});

 