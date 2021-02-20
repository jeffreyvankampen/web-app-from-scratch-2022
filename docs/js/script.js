//code splitsen modules 
//routie checkt de url, of er een hashtag is, en dan kun je een functie aanroepen
//globale scope kan conflicten met browser plugin of dergelijke
//? is voor de query/vraag en # target of route in de API
//door & kun je een parameter toevoegen een zoekvraag, = om te zoeken

const button = document.querySelector('#button');
const search = document.querySelector('#search');
const container = document.querySelector(".container");
const movieList = document.querySelector(".movieList");
const apiKey = '827f3e5d';
const url = 'http://www.omdbapi.com/';

function movies(data) { 
  console.log(data.Year); 
  // return 'apiKey'
  // const {} = haalt een object uit elkaar, om waardes te koppelen
}

fetch('http://www.omdbapi.com/?apikey=827f3e5d&t=star') //vangt
  .then((response) => response.json()) //dan met functie om te antwoorden belofte
  .then(movies) //function(response) { return response.json() }



// undefined ===
// const minAge = 18 , ( 0 > .length ) 
// => = functie met een return
// promise = belofte dat de data terugkomt als 
// parameter ofwel waarde binnen de functie
// () functie uitvoeren 
//  .then is een terugkoppeling/callback om fetch aan te spreken en uitvoeren
//  functie declareren en aanspreken
//  met fetch haal je data op uit de url, en data meegeven
//  {} voor een object, key voor een waarde/string (value)
//  JSON converteerd tot data, met object/values





