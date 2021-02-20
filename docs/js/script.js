//comments om de applicatie te verantwoorden
//code splitsen modules 
//routie checkt de url, of er een hashtag is, en dan kun je een functie aanroepen

// import { getData } from './dataFetch.js'
// import { showData } from './displayData.js'

// const search = document.querySelector('#search');
const button = document.querySelector('#button');
const container = document.querySelector(".container");
const search = document.getElementById('search');
console.log(search);

function handleRoutes() {
  routie({
    '': () => { //als de url nog geen hashtag heeft
      getHome() //verwijst naar regel 23
    },
    ':id': id => { //als de url een hashtag heeft, in dit geval movieID dan krijgt hij iets terug
      getDetail(id) //getDetail is de opbouw om de API terug te krijgen
    }
  });
}

search.addEventListener("submit", async function (event) { //triggert event 
  event.preventDefault(); //preventdefault voorkomt de standaard actie
  const query = event.target[0].value //leest de waarde van het zoekveld
  
  if (query.length > 0) {
    const data = await apiCall('overzicht', resultaat, query);
    const resultaat = data.Search
    toonResultaat(resultaat);
  }
})

async function getHome() {
  const data = await apiCall('overzicht');
  const resultaten = data.Search;
  toonResultaten(resultaten);
}

function card(id, title, image) {
  return `<a href="#${id}">
            <div class="card">
              <h3>${title}</h3>
              <img src="${image}" style="width:350px">
            </div>  
          </a>
  `;
}
function toonResultaat(movie){
  const movieList = document.querySelector('.movieList');
  movieList.insertAdjacentHTML('beforeend', card(movie.imdbID, movie.Title, movie.Poster));
}

function toonResultaten(resultaten) {
  const details = document.querySelector('.details');

  if (details) {
    details.style.display = "none";
  }

  resultaten.forEach(movie => {
    toonResultaat(movie)
  });
}

function toonDetail(details) {
  const movieList = document.querySelector('.movieList');
  document.querySelectorAll('.card').forEach((card) => {
    card.style.display = "none";
  });
  movieList.insertAdjacentHTML('beforeend', `
  <div class="details">
  <a href="">Terug naar overzicht</a>
  <h1>${details.Title}</h1>
  <img src="${details.Poster}" style="width:300px">
  <p>${details.Plot}</p>
  </div>
  `);
}

async function getDetail(id) {
  console.log('laadt detail');
  const data = await apiCall('detail', id);
  //const id = document.location.hash();
  const resultaten = data;
  toonDetail(resultaten);
}

async function apiCall(call, id, query) { //call is (templates) of de pagina aangeven
  const key = '827f3e5d';
  const endpoint = 'https://www.omdbapi.com/';
  console.log(query);
  if(query === undefined){
    query = "Fantastic";
  }
  let url = "";
  if (call == "overzicht") {
    url = `${endpoint}?apikey=${key}&s=${query}`;
    const fetchRequest = await fetch(url).then(response => response.json()).then(data => {
      return data
    });
    return fetchRequest;
  } else if (call == "detail") {
    console.log(id);
    url = `${endpoint}?apikey=${key}&i=${id}`;
    const fetchRequest = await fetch(url).then(response => response.json()).then(data => {
      return data
    });
    console.log(fetchRequest)
    return fetchRequest;
  }
}

handleRoutes()