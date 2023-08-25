import axios from 'axios'

export async function handler(event, context) {
  const { location } = event.queryStringParameters
  // const location = '106696918'

  const options = {
    method: 'GET',
    url: `https://foreca-weather.p.rapidapi.com/forecast/daily/${location}`,
    params: {
      periods: '7',
      dataset: 'full',
    },
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
