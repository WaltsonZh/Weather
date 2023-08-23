import axios from 'axios'

export async function handler(event, context) {
  const { lat, lon } = event.queryStringParameters
  // const { lat, lon } = { lat: '24.9921536', lon: '121.297' }

  const options = {
    method: 'GET',
    url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
    params: {
      range: '0',
      latitude: lat,
      longitude: lon,
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com',
    },
  }

  try {
    const { data } = await axios.request(options)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: 500,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}
