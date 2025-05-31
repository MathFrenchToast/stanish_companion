<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-2xl font-bold">Welcome to Stanish Protocol</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <span class="sr-only">Close</span>
          ✕
        </button>
      </div>

      <div class="prose prose-blue max-w-none">
        <h3>What is the Stanish Protocol?</h3>
        <p>
          The Stanish Protocol is a structured 6-week program designed to help recover from Achilles tendon issues. 
          It combines stretching and strengthening exercises with a progressive increase in intensity.
        </p>

        <h3>Program Structure</h3>
        <ul>
          <li>Daily exercises over 6 weeks</li>
          <li>Progressive load increase week by week</li>
          <li>Three speed variations throughout each week</li>
        </ul>

        <h3>Each Workout Session</h3>
        <ol>
          <li>Initial stretching (5 x 20 seconds)</li>
          <li>Main strengthening exercise (3 x 10 repetitions)</li>
          <li>Final stretching (5 x 20 seconds)</li>
          <li>Icing (10 minutes)</li>
        </ol>

        <h3>How This App Helps</h3>
        <ul>
          <li>Tracks your progress through the 6-week program</li>
          <li>Times your stretches and exercises</li>
          <li>Monitors pain levels to adjust intensity</li>
          <li>Provides visual guidance for exercises</li>
          <li>Reminds you of important steps like icing</li>
        </ul>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <label class="flex items-center gap-2 text-sm text-gray-600">
          <input 
            type="checkbox" 
            v-model="dontShowAgain"
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          >
          Don't show this again
        </label>
        <button 
          @click="close" 
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWorkoutStore } from '../stores/workout'

const emit = defineEmits(['close'])
const store = useWorkoutStore()
const dontShowAgain = ref(false)

const close = () => {
  if (dontShowAgain.value) {
    store.updateSettings({ showInfoScreen: false })
  }
  emit('close')
}
</script>