<template>
  <div class="max-w-3xl mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Progress Tracker</h2>
      <button @click="togglePastWeeks" class="text-blue-600 hover:text-blue-800">
        {{ store.showPastWeeks ? 'Hide' : 'Show' }} Past Weeks
      </button>
    </div>
    
    <template v-for="week in 6" :key="week">
      <WeekProgress 
        v-if="shouldShowWeek(week)"
        :week="week"
        @startWorkout="$emit('startWorkout')"
      />
    </template>
  </div>
</template>

<script setup>
import { useWorkoutStore } from '../stores/workout'
import WeekProgress from './WeekProgress.vue'

const store = useWorkoutStore()

const shouldShowWeek = (week) => {
  return store.showPastWeeks || week >= store.currentWeek
}

const togglePastWeeks = () => {
  store.togglePastWeeks()
}

defineEmits(['startWorkout'])
</script>