import axios from 'axios'

export async function handler(event, context) {
  const { location } = event.queryStringParameters
  // const location = 'Taoyuan City'

  const options = {
    method: 'GET',
    url: `https://foreca-weather.p.rapidapi.com/location/search/${location}`,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
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
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}
