<template>
  <div class="bg-white rounded-lg shadow p-4 mb-4">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold">Week {{ week }}</h3>
      <span class="text-sm text-gray-500">{{ getWorkoutType }}</span>
    </div>
    <div class="grid grid-cols-7 gap-2">
      <div v-for="day in 7" :key="day" 
           :class="['p-2 rounded border', isCurrentDay(day) ? 'border-blue-500 bg-blue-50' : 'border-gray-200']"
           @click="handleDayClick(day)">
        <div class="text-sm font-medium mb-1">Day {{ day }}</div>
        <template v-if="isWorkoutCompleted(day)">
          <div class="flex items-center justify-center">
            <span class="text-green-500">✓</span>
            <span class="ml-1">{{ getPainEmoji(day) }}</span>
          </div>
        </template>
        <template v-else>
          <div class="text-xs text-gray-500">
            {{ getWorkoutDescription(day) }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWorkoutStore } from '../stores/workout'

const props = defineProps({
  week: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['startWorkout'])

const store = useWorkoutStore()

const isCurrentDay = (day) => {
  return store.currentWeek === props.week && store.currentDay === day
}

const isWorkoutCompleted = (day) => {
  return store.isWorkoutCompleted(props.week, day)
}

const getPainEmoji = (day) => {
  const painLevel = store.getPainLevel(props.week, day)
  if (!painLevel) return ''
  const emojis = { none: '😊', moderate: '😐', high: '😣' }
  return emojis[painLevel] || ''
}

const getWorkoutType = computed(() => {
  const types = {
    'bipodal': 'Two-legged support',
    'bipodal-emphasis': 'Two-legged (emphasis)',
    'unipodal': 'Single-leg',
    'unipodal-10': 'Single-leg +10% weight',
    'unipodal-20': 'Single-leg +20% weight'
  }
  return types[store.getCurrentWorkoutType]
})

const getWorkoutDescription = (day) => {
  if (day <= 2) return 'Slow'
  if (day <= 5) return 'Medium'
  return 'Fast'
}

const handleDayClick = (day) => {
  if (isCurrentDay(day) && !isWorkoutCompleted(day)) {
    emit('startWorkout')
  }
}
</script>