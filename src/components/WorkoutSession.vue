<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">
            Week {{ store.currentWeek }} - Day {{ store.currentDay }}
          </h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <span class="sr-only">Close</span>
            ✕
          </button>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <p class="font-medium">Today's workout:</p>
          <p>Support: {{ store.getCurrentWorkoutType }}</p>
          <p>Speed: {{ store.getCurrentSpeed }}</p>
          <p>Rep Duration: {{ store.getCurrentRepDuration }}s</p>
        </div>
      </div>

      <!-- Warmup -->
      <div v-if="store.workoutSession.step === 'warmup'" class="text-center">
        <h3 class="text-xl font-semibold mb-4">Stretching</h3>
        <div class="mb-4">
          <p class="text-4xl font-bold mb-2">
            {{ store.workoutSession.stretchCount + 1 }}/{{ store.workoutSession.totalStretches }}
          </p>
          <p>Hold for {{ store.workoutSession.stretchDuration }} seconds</p>
        </div>
        <div class="text-6xl font-bold mb-4">
          {{ timer }}
        </div>
        <div class="relative">
          <button 
            @click="startStretchTimer"
            :disabled="isTimerRunning"
            class="relative bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 w-48 overflow-hidden"
          >
            <div 
              v-if="buttonTimer > 0"
              class="absolute inset-0 bg-green-500 transition-all duration-100"
              :style="{ width: `${(buttonTimer / store.settings.restTime) * 100}%` }"
            ></div>
            <span class="relative z-10">
              {{ isTimerRunning ? 'Stretching...' : buttonTimer > 0 ? 'Starting in ' + (store.settings.restTime - buttonTimer) + 's...' : 'Start Stretch' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Exercise -->
      <div v-if="store.workoutSession.step === 'exercise'" class="text-center">
        <h3 class="text-xl font-semibold mb-4">Main Exercise</h3>
        <div class="mb-4">
          <p class="text-2xl">
            Set {{ store.workoutSession.currentSet }}/{{ store.workoutSession.totalSets }}
          </p>
          <p class="text-xl">
            Rep {{ store.workoutSession.currentRep }}/{{ store.workoutSession.totalReps }}
          </p>
        </div>
        <div class="relative">
          <button 
            @click="handleRepComplete"
            class="relative bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 w-48 overflow-hidden"
          >
            <div 
              v-if="repTimer > 0"
              class="absolute inset-0 bg-blue-400 transition-all duration-100"
              :style="{ width: `${(repTimer / store.getCurrentRepDuration) * 100}%` }"
            ></div>
            <span class="relative z-10">Next Rep</span>
          </button>
        </div>
      </div>

      <!-- Cooldown -->
      <div v-if="store.workoutSession.step === 'cooldown'" class="text-center">
        <h3 class="text-xl font-semibold mb-4">Final Stretching</h3>
        <div class="mb-4">
          <p class="text-4xl font-bold mb-2">
            {{ store.workoutSession.stretchCount + 1 }}/{{ store.workoutSession.totalStretches }}
          </p>
          <p>Hold for {{ store.workoutSession.stretchDuration }} seconds</p>
        </div>
        <div class="text-6xl font-bold mb-4">
          {{ timer }}
        </div>
        <div class="relative">
          <button 
            @click="startStretchTimer"
            :disabled="isTimerRunning"
            class="relative bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 w-48 overflow-hidden"
          >
            <div 
              v-if="buttonTimer > 0"
              class="absolute inset-0 bg-green-500 transition-all duration-100"
              :style="{ width: `${(buttonTimer / store.settings.restTime) * 100}%` }"
            ></div>
            <span class="relative z-10">
              {{ isTimerRunning ? 'Stretching...' : buttonTimer > 0 ? 'Starting in ' + (store.settings.restTime - buttonTimer) + 's...' : 'Start Stretch' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Complete -->
      <div v-if="store.workoutSession.step === 'complete'" class="text-center">
        <h3 class="text-xl font-semibold mb-4">Great job! 🎉</h3>
        <p class="mb-4">How was the pain level during this session?</p>
        <div class="flex justify-center gap-4 mb-6">
          <button 
            v-for="(label, level) in painLevels" 
            :key="level"
            @click="completeWorkout(level)"
            class="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            {{ label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useWorkoutStore } from '../stores/workout'
import { useIntervalFn } from '@vueuse/core'

const emit = defineEmits(['close'])
const store = useWorkoutStore()

const painLevels = {
  none: '😊 None',
  moderate: '😐 Moderate',
  high: '😣 High'
}

const timer = ref(0)
const isTimerRunning = ref(false)
const buttonTimer = ref(0)
const repTimer = ref(0)

const { pause: pauseTimer, resume: startInterval } = useIntervalFn(() => {
  if (timer.value > 0) {
    timer.value--
  } else {
    pauseTimer()
    isTimerRunning.value = false
    handleStretchComplete()
  }
}, 1000, { immediate: false })

const { pause: pauseButtonTimer, resume: startButtonInterval } = useIntervalFn(() => {
  if (buttonTimer.value < store.settings.restTime) {
    buttonTimer.value++
    if (buttonTimer.value >= store.settings.restTime) {
      startStretchTimer()
    }
  }
}, 1000, { immediate: false })

const { pause: pauseRepTimer, resume: startRepInterval } = useIntervalFn(() => {
  if (repTimer.value < store.getCurrentRepDuration) {
    repTimer.value++
    if (repTimer.value >= store.getCurrentRepDuration) {
      handleRepComplete()
    }
  }
}, 1000, { immediate: false })

const startStretchTimer = () => {
  pauseButtonTimer()
  buttonTimer.value = 0
  timer.value = store.workoutSession.stretchDuration
  isTimerRunning.value = true
  startInterval()
}

const handleStretchComplete = () => {
  store.workoutSession.stretchCount++
  if (store.workoutSession.stretchCount >= store.workoutSession.totalStretches) {
    store.workoutSession.stretchCount = 0
    store.nextStep()
    if (store.workoutSession.step === 'exercise') {
      startRepInterval()
    }
  } else {
    buttonTimer.value = 0
    startButtonInterval()
  }
}

const handleRepComplete = () => {
  pauseRepTimer()
  repTimer.value = 0
  
  if (store.workoutSession.currentRep < store.workoutSession.totalReps) {
    store.workoutSession.currentRep++
    startRepInterval()
  } else {
    store.workoutSession.currentRep = 1
    if (store.workoutSession.currentSet < store.workoutSession.totalSets) {
      store.workoutSession.currentSet++
      startRepInterval()
    } else {
      store.nextStep()
    }
  }
}

const completeWorkout = (painLevel) => {
  store.completeWorkout(painLevel)
  emit('close')
}

watch(() => store.workoutSession.step, (newStep) => {
  if (newStep === 'exercise') {
    repTimer.value = 0
    startRepInterval()
  }
})

onMounted(() => {
  store.resetWorkoutSession()
  startButtonInterval()
})

onUnmounted(() => {
  pauseTimer()
  pauseButtonTimer()
  pauseRepTimer()
})
</script>