<template>
  <v-progress-linear indeterminate :height="5" v-if="loading"/>
  <v-expand-transition>
    <v-card v-if="search || !weatherData" class="mx-auto my-2" max-width="368">
      <v-autocomplete
          label="Город"
          v-model:search="location"
          :items="items"
          item-title="name"
          item-value="name"
          @input="fetchCities"
          hide-details
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="item.raw.name" @keydown.enter="cityClick({item : item.raw})"
                       @click="cityClick({item : item.raw})">
            <template #subtitle>
              {{ item.raw.country }}, {{ item.raw.state }}
            </template>
          </v-list-item>
        </template>
      </v-autocomplete>
    </v-card>
  </v-expand-transition>
  <v-card class="mx-auto my-2" max-width="368" v-if="weatherData">
    <v-card-item :title="weatherData?.city.name">
      <template #append>
        <v-btn @click="search = !search" icon="mdi-magnify" variant="text"/>
      </template>
      <template #subtitle>
        {{ weatherData?.list[0].weather[0].description }}
      </template>
    </v-card-item>
    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="6">
          {{ Math.round(weatherData?.list[0].main.temp) + '&deg;C' }}
        </v-col>
        <v-col cols="6" class="text-right">
          <v-img :src="`https://openweathermap.org/img/wn/${weatherData?.list[0].weather[0].icon}@2x.png`"/>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle>Ощущается как: {{ weatherData.list[0].main.feels_like}}&deg;С</v-card-subtitle>
    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        {{ weatherData?.list[0].wind.speed }} м/сек
      </v-list-item>
      <v-list-item density="compact" prepend-icon="mdi-water-percent">

        {{ weatherData?.list[0].main.humidity }}%
      </v-list-item>
    </div>
  </v-card>
  <v-card class="mx-auto my-2" max-width="368" v-if="forecastData">
    <ThreeDaysWeatherCard />
  </v-card>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia"
import {useAppState} from "~/store"
import axios from "axios"

const {weatherData,forecastData} = storeToRefs(useAppState())
const {getWeatherData} = useAppState()

const search = ref(false)
const cityClick = async ({item}: { item: any }) => {
  loading.value = true
  await getWeatherData(item)
  search.value = false
  loading.value = false
}

const location = ref('')
const loading = ref(false)
const items = ref([])
const fetchCities = async () => {
  loading.value = true
  try {
    const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location.value}&limit=5&appid=37c28e921898e6e57e2f7aeb22d414df`)
    items.value = res.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching city data:', error)
    loading.value = false
  }
}

</script>