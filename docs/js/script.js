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
      getHome()
    },
    ':id': id => { //als de url een hashtag heeft, in dit geval movieID dan krijgt hij iets terug
      getDetail(id) //getDetail is de opbouw om de API terug te krijgen
    }
  });
}

async function getHome() {
  console.log('laadt home');
  //data ophalen via getData
  const key = '827f3e5d';
  const endpoint = 'https://www.omdbapi.com/';
  let url = `${endpoint}?apikey=${key}&s=fantastic`;
  const id = "";
  const data = await getData(id);
  console.log(data);
  //en dan tonen
}

async function getDetail(id) { 
  console.log('laadt detail');
}

async function getData(value) {
  if (value === undefined) {
    console.log('toon overzicht')
  }

  console.log(value)
  // const key = '827f3e5d';
  // const endpoint = 'https://www.omdbapi.com/';
  // let url = `${endpoint}?apikey=${key}&s=fantastic`;

  if (value.length > 0) {
    console.log('laadt detailpagina')
    url = `${endpoint}?apikey=${key}&i=${value}`;
  } else {
    console.log('laadt overzichtspagina');
  }

  await fetch(url)
    .then(response => response.json())
    .then(data => showData(data))
    .catch(err => {
      console.log(err);
    });
}

function showData(data) { // toont de data op de website
  const movieList = document.querySelector('.movieList');
  movieList.innerHTML = '';
  if (data.Search) { //Search is alleen beschikbaar met een lijst van meerdere zoekresultaten via de tag
    const movies = data.Search; // met de 'await' wacht het script tot de data geladen is

    movies.forEach(movie => {
      const link = document.createElement("a")
      const article = document.createElement("article")
      const title = document.createElement("h3")
      const img = document.createElement("img")

      link.setAttribute('href', '#' + movie.imdbID) //vult de href met de endpoint (#) van film ID aan
      img.setAttribute('src', movie.Poster) //zet bij beide regels een attribuut om de inhoud en endpoint te combineren
      title.textContent = movie.Title;

      article.appendChild(title)
      link.appendChild(article)
      article.appendChild(img)
      movieList.appendChild(link)

    })
  } else { //Bij enkel resultaat voer de else functie uit

    const movie = data
    const title = document.createElement("h2");

    title.textContent = movie.Title;
    container.appendChild(title);

    const movieDetail =
    `<article><h2>Film ${movie.Title}</h2></article>`
    movieList.insertAdjacentHTML('beforeend', movieDetail);
    console.log(data)
  }
}

handleRoutes()