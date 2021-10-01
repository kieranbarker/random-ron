'use strict';

const api = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

const quote = document.querySelector('#quote');
const button = document.querySelector('#more-ron');

function getJSON(response) {
  if (response.ok) return response.json();
  const error = new Error('Try again later.');
  return Promise.reject(error);
}

function getData() {
  return fetch(api).then(getJSON);
}

function insertQuote(quotes) {
  quote.textContent = quotes[0];
}

function insertError(error) {
  quote.textContent = error.toString();
}

function getQuote() {
  getData()
    .then(insertQuote)
    .catch(insertError);
}

getQuote();

button.addEventListener('click', getQuote);