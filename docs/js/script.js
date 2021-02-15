const search = document.querySelector('#search')
const button = document.querySelector('#button')

function handleRoutes() {
  routie({
    '': () => {
      getData()
    },
    ':id': id => {
      getData(id)
    }
  });
}

// button.addEventListener('click', readInput)

async function getData(value) {
  const key = '827f3e5d';
  const endpoint = 'https://www.omdbapi.com/';
  let url = `${endpoint}?apikey=${key}&s=new`;

  if (value) {
    url = `${endpoint}?apikey=${key}&i=${value}`;
  }
  // getData met de input combineren

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
    console.log(movies); // kan je in de console kijken wat de mogelijk data is
    const movieArray = movies.map(movie => {
      return (
        `<a href="#${movie.imdbID}"><article><img src=${movie.Poster}/><h2> ${movie.Title}</h2></article></a>`
      )
    })
    movieList.insertAdjacentHTML('beforeend', movieArray.join(' '));
  } else { //Bij enkel resultaat voer de else functie uit

    const movie = data
    const movieDetail =
      `<article><h2>Film ${movie.Title}</h2></article>`
    movieList.insertAdjacentHTML('beforeend', movieDetail);
    console.log(data)
  }
}

function readInput() {
  inputValue = search.value
}

handleRoutes()