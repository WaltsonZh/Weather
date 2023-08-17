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
// tomorrow.io
app.get('/hourforecast', (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon
    const timezone = req.query.timezone

    const options = {
        method: 'GET',
        url: 'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast',
        params: {
            location: `${lat} ${lon}`,
            timesteps: '1h',
            startTime: 'now',
            endTime: 'nowPlus6h',
            timezone: timezone,
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com',
        },
    }

    axios
        .request(options)
        .then((response) => res.json(response.data))
        .catch((err) => console.log(err))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
