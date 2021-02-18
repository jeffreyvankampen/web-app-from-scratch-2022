//comments om de applicatie te verantwoorden
//code splitsen modules 
//routie checkt de url, of er een hashtag is, en dan kun je een functie aanroepen

// import { getData } from './dataFetch.js'
// import { showData } from './displayData.js'

const search = document.querySelector('#search')
const button = document.querySelector('#button')
const container = document.querySelector(".container");

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

async function getHome() {
  const data = await apiCall('overzicht');
  const resultaten = data.Search;
  toonResultaten(resultaten);
}

function card(id, title, image){
  return `<a href="#${id}">
            <div class="card">
              <h3>${title}</h3>
              <img src="${image}" style="width:350px">
            </div>  
          </a>
  `;
}

function toonResultaten(resultaten) {
  const movieList = document.querySelector('.movieList');

  resultaten.forEach(movie => {
    console.log(movie);
    movieList.insertAdjacentHTML('beforeend', card(movie.imdbID, movie.Title, movie.Poster));
  });
}

function toonDetail(details){
  const movieList = document.querySelector('.movieList');
  movieList.insertAdjacentHTML('beforeend', `<div class="details"><h1>${details.Title}</h1></div>`);
}

async function getDetail(id) { 
  console.log('laadt detail');
  const data = await apiCall('detail', id);
  //const id = document.location.hash();
  const resultaten = data;
  toonDetail(resultaten);

}

async function apiCall(call, id) {
  const key = '827f3e5d';
  const endpoint = 'https://www.omdbapi.com/';
  const query = "Fantastic";
  let url = "";
  if(call == "overzicht"){
     url = `${endpoint}?apikey=${key}&s=${query}`;
     const fetchRequest =  await fetch(url).then(response => response.json()).then(data => {return data});
     return fetchRequest;
  } else if(call == "detail"){
    console.log(id);
    url = `${endpoint}?apikey=${key}&i=${id}`;
    const fetchRequest =  await fetch(url).then(response => response.json()).then(data => {return data});
    console.log(fetchRequest)
    return fetchRequest;        
  }
}

// async function getData(value) {
//   if (value === undefined) {
//     console.log('toon overzicht')
//   }

//   console.log(value)

//   if (value.length > 0) {
//     console.log('laadt detailpagina')
//     url = `${endpoint}?apikey=${key}&i=${value}`;
//   } else {
//     console.log('laadt overzichtspagina');
//   }

//   await fetch(url)
//     .then(response => response.json())
//     .then(data => showData(data))
//     .catch(err => {
//       console.log(err);
//     });
// }

// function showData(data) { // toont de data op de website
//   const movieList = document.querySelector('.movieList');
//   movieList.innerHTML = '';
//   if (data.Search) { //Search is alleen beschikbaar met een lijst van meerdere zoekresultaten via de tag
//     const movies = data.Search; // met de 'await' wacht het script tot de data geladen is

//     movies.forEach(movie => {
//       const link = document.createElement("a")
//       const article = document.createElement("article")
//       const title = document.createElement("h3")
//       const img = document.createElement("img")

//       link.setAttribute('href', '#' + movie.imdbID) //vult de href met de endpoint (#) van film ID aan
//       img.setAttribute('src', movie.Poster) //zet bij beide regels een attribuut om de inhoud en endpoint te combineren
//       title.textContent = movie.Title;

//       article.appendChild(title)
//       link.appendChild(article)
//       article.appendChild(img)
//       movieList.appendChild(link)

//     })
//   } else { //Bij enkel resultaat voer de else functie uit

//     const movie = data
//     const title = document.createElement("h2");

//     title.textContent = movie.Title;
//     container.appendChild(title);

//     const movieDetail =
//     `<article><h2>Film ${movie.Title}</h2></article>`
//     movieList.insertAdjacentHTML('beforeend', movieDetail);
//     console.log(data)
//   }
// }

handleRoutes()