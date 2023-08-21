import axios from 'axios'

export async function handler(event, context) {
  // const { location, timezone } = event.queryStringParameters
  const { location, timezone } = { location: 106696918, timezone: 'Asia/Taipei' }

  const options = {
    method: 'GET',
    url: `https://foreca-weather.p.rapidapi.com/current/${location}`,
    params: {
      windunit: 'KMH',
      tz: timezone,
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
