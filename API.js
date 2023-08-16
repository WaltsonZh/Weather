const PORT = 8000
import express, { response } from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.json('WELCOME!!')
})

app.get('/hourForecast', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast',
        params: {
            location: '24.99 121.29',
            timesteps: '1d',
            startTime: 'now',
            endTime: 'nowPlus5d',
            timezone: 'Asia/Taipei',
            fields: ['temperature', 'precipitationProbability', 'weatherCodeDay', 'weatherCodeNight'],
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com',
        },
    }

    axios
        .request(options)
        .then((response) => res.json(response.data))
        .catch((err) => console.error(err))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
