import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from 'axios'

export const useAppState = defineStore('appState', () => {
	const weatherData = ref(null)
	const forecastData = ref(null)
	const apiKey = ref('8bee6552e17e3264da2bbdd6c670305d')

	const getWeatherData = async (city) => {
		try {
			const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&lang=ru&units=metric&cnt=30&appid=${apiKey.value}`)
			weatherData.value = res.data
			const resFore = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&exclude=current,minutely,hourly,alerts&units=metric&lang=ru&appid=${apiKey.value}`)
			forecastData.value = resFore.data
			console.log(resFore.data)
			console.log(res.data)
		} catch (error) {
			console.error('Error fetching weather data:', error)
		}
	}

	return {
		weatherData,
		forecastData,
		getWeatherData,
	}
})
