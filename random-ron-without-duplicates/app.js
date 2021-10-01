'use strict';

const api = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

const prevQuotes = [];

const quote = document.querySelector('#quote');
const button = document.querySelector('#more-ron');

function getJSON(response) {
  if (response.ok) return response.json();
  const error = new Error('Try again later.');
  return Promise.reject(error)
}

function getData() {
  return fetch(api).then(getJSON);
}

function checkQuote(quotes) {
  if (prevQuotes.includes(quotes[0])) {
    return getData().then(checkQuote);
  }

  if (prevQuotes.length === 50) {
    prevQuotes.shift();
  }

  prevQuotes.push(quotes[0]);

  return quotes[0];
}

function insertQuote(quoteStr) {
  quote.textContent = quoteStr;
}

function insertError(error) {
  quote.textContent = error.toString();
}

function getQuote() {
  getData()
    .then(checkQuote)
    .then(insertQuote)
    .catch(insertError);
}

getQuote();

button.addEventListener('click', getQuote);