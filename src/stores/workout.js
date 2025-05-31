import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useWorkoutStore = defineStore('workout', {
  state: () => ({
    currentWeek: useLocalStorage('currentWeek', 1),
    currentDay: useLocalStorage('currentDay', 1),
    progress: useLocalStorage('progress', {}),
    showPastWeeks: useLocalStorage('showPastWeeks', true)
  }),

  getters: {
    isWorkoutCompleted: (state) => (week, day) => {
      return state.progress[`${week}-${day}`]?.completed || false
    },
    getPainLevel: (state) => (week, day) => {
      return state.progress[`${week}-${day}`]?.painLevel || null
    },
    getCurrentWorkoutType: (state) => {
      const week = state.currentWeek
      if (week <= 1) return 'bipodal'
      if (week === 2) return 'bipodal-emphasis'
      if (week === 3) return 'unipodal'
      if (week === 4) return 'unipodal-10'
      return 'unipodal-20'
    }
  },

  actions: {
    completeWorkout(week, day, painLevel) {
      this.progress[`${week}-${day}`] = {
        completed: true,
        painLevel,
        completedAt: new Date().toISOString()
      }
    },
    togglePastWeeks() {
      this.showPastWeeks = !this.showPastWeeks
    }
  }
})