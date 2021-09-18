;(function() {

  'use strict';

  //
  // Variables
  //

  // Save the API endpoint
  const api = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

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
   * Insert the quote into the DOM
   * @param {string[]} quotes The array of quotes
   */
  function insertQuote(quotes) {
    quote.textContent = quotes[0];
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
    fetch(api)
      .then(getJSON)
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