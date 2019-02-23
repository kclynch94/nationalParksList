'use strict';

const apiKey = "rbR0lm79ljgCAmxwn3jQTvjQRVvjGM7e1nYuH1q0"

const baseURL = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=`;


function getNationalParks(stateCode, maxResults=10){
  const url = `${baseURL}${stateCode}`;
  console.log(url);

  fetch (url)
  .then (response => {
    if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
  })
  .then (responseJson => displayResults(responseJson, maxResults))
  .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();

  for(let i=0;i<responseJson.data.length & i<maxResults ;i++) {
    $('#results-list').append(
      `<li><p>${responseJson.data[i].fullName}</p><p>${responseJson.data[i].description}</p><a href="${responseJson.data[i].url}" target="_blank">Website</a></li>`
    )
  }

  $('#results').removeClass('hidden');
}


function watchForm() {
$('form').submit(event => {
  event.preventDefault();
  const stateCode = $('#js-stateCode').val();
  const maxResults = $('#js-max-results').val();
  console.log(stateCode);
  getNationalParks(stateCode, maxResults);
})
}

$(watchForm());
