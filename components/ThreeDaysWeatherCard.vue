<template>
  <v-list class="bg-transparent" v-for="day in forecastData.daily.slice(0,3)" :key="day.dt">
    <v-list-item
        :append-avatar="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
    >
      <template #title>
        {{ruDays[new Date(day.dt * 1000).getDay()]}}
      </template>
      <template #subtitle>
        {{ day.weather[0].description }} от {{day.temp.min}} до {{day.temp.max}}
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useAppState} from '~/store'

const ruDays = ref(["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"])

const {forecastData} = storeToRefs(useAppState())
console.log(forecastData.value.daily)
</script>