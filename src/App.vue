<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">Stanish Protocol</h1>
    </nav>
    <main class="container mx-auto p-4">
      <div class="flex flex-col items-center justify-center mt-10">
        <h2 class="text-2xl font-bold mb-6">Welcome to Stanish Protocol</h2>
        <button 
          @click="startWorkout" 
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Workout
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
const startWorkout = () => {
  // TODO: Implement workout start
  console.log('Starting workout...');
};
</script>