<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-bold mb-4">Settings</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Rest time between stretches
        </label>
        <div class="flex items-center gap-2">
          <input
            type="number"
            v-model="settings.restTime"
            min="1"
            max="30"
            class="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span class="text-gray-500">seconds</span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Rep duration
        </label>
        <div class="flex items-center gap-2">
          <input
            type="number"
            v-model="settings.repDuration"
            min="1"
            max="10"
            class="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span class="text-gray-500">seconds</span>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-end">
      <button
        @click="saveAndClose"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useWorkoutStore } from '../stores/workout'

const emit = defineEmits(['close'])
const store = useWorkoutStore()
const settings = reactive({
  restTime: store.settings.restTime,
  repDuration: store.settings.repDuration
})

const saveAndClose = () => {
  store.updateSettings(settings)
  emit('close')
}
</script>