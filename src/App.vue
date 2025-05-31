<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Stanish Protocol</h1>
        <button 
          @click="showWorkout = true" 
          class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Start Today's Workout
        </button>
      </div>
    </nav>
    
    <main class="container mx-auto p-4">
      <ProgressTracker />
    </main>

    <WorkoutSession 
      v-if="showWorkout"
      @close="showWorkout = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWorkoutStore } from './stores/workout'
import ProgressTracker from './components/ProgressTracker.vue'
import WorkoutSession from './components/WorkoutSession.vue'

const store = useWorkoutStore()
const showWorkout = ref(false)
</script>