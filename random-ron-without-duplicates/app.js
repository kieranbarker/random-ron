;(function() {

  'use strict';

  //
  // Variables
  //

  // Save the API endpoint
  const api = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

  // Keep track of the last 50 quotes
  const prevQuotes = [];

  // Get the quote and button elements
  const quote = document.querySelector('#quote');
  const button = document.querySelector('#more-ron');


  //
  // Functions
  //

  /**
   * Get the JSON data from a Fetch request
   * @param {Response} response The Response object
   * @returns {Promise} The JSON data or an Error object
   */
  function getJSON(response) {
    // If the response was OK, return the JSON data
    if (response.ok) return response.json();

    // Otherwise, return an Error object
    const error = new Error('Try again later.');
    return Promise.reject(error)
  }

  /**
   * Fetch the array of quotes from the API
   * @returns {Promise} The JSON data or an Error object
   */
  function getData() {
    return fetch(api).then(getJSON);
  }

  /**
   * Check if the quote was among the last 50 quotes
   * @param {string[]} quotes The array of quotes
   * @returns {Promise<string>|string} The quote
   */
  function checkQuote(quotes) {
    // If this quote was among the last 50, get a new one
    if (prevQuotes.includes(quotes[0])) {
      return getData().then(checkQuote);
    }

    // If there are 50 quotes, remove the first one
    if (prevQuotes.length === 50) {
      prevQuotes.shift();
    }

    // Add this quote to the previous quotes
    prevQuotes.push(quotes[0]);

    // Return the quote
    return quotes[0];
  }

  /**
   * Insert the quote into the DOM
   * @param {string} quoteStr The quote
   */
  function insertQuote(quoteStr) {
    quote.textContent = quoteStr;
  }

  /**
   * Insert the error message into the DOM
   * @param {Error} error The Error object
   */
  function insertError(error) {
    quote.textContent = error.toString();
  }

  /**
   * Fetch a quote and insert it into the DOM
   */
  function getQuote() {
    getData()
      .then(checkQuote)
      .then(insertQuote)
      .catch(insertError);
  }


  //
  // Inits & Event Listeners
  //

  // Show a quote
  getQuote();

  // Handle click events
  button.addEventListener('click', getQuote);

})();