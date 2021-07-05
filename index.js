// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const userAction = async () => {
  const response = await fetch('http://example.com/movies.json', {
    method: 'POST',
    body: myBody, // string or object
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
}