const RANDOM_API_QUOTE_URL = 'https://api.quotable.io/random'

export function getRandomQuotes(){
    return fetch(RANDOM_API_QUOTE_URL)
  .then(response => response.json())
  .then(data => data)
}
