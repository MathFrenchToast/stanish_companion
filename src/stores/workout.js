import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useWorkoutStore = defineStore('workout', {
  state: () => ({
    currentWeek: useLocalStorage('currentWeek', 1),
    currentDay: useLocalStorage('currentDay', 1),
    progress: useLocalStorage('progress', {}),
    showPastWeeks: useLocalStorage('showPastWeeks', true),
    settings: useLocalStorage('settings', {
      restTime: 10,
      repDuration: 6,
      showInfoScreen: true
    }),
    workoutSession: {
      step: 'warmup',
      timer: 0,
      currentSet: 1,
      currentRep: 1,
      totalSets: 3,
      totalReps: 10,
      stretchCount: 0,
      totalStretches: 5,
      stretchDuration: 20,
      restDuration: 30,
    }
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
    },
    getCurrentSpeed: (state) => {
      if (state.currentDay <= 2) return 'slow'
      if (state.currentDay <= 5) return 'medium'
      return 'fast'
    },
    getCurrentRepDuration: (state) => {
      const speed = state.currentDay <= 2 ? 'slow' : state.currentDay <= 5 ? 'medium' : 'fast'
      const baseDuration = state.settings.repDuration
      
      switch (speed) {
        case 'slow':
          return baseDuration
        case 'medium':
          return Math.round(baseDuration / 2)
        case 'fast':
          return Math.round(baseDuration / 3)
        default:
          return baseDuration
      }
    }
  },

  actions: {
    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings }
    },
    completeWorkout(painLevel) {
      this.progress[`${this.currentWeek}-${this.currentDay}`] = {
        completed: true,
        painLevel,
        completedAt: new Date().toISOString()
      }
      
      if (this.currentDay === 7) {
        this.currentDay = 1
        if (this.currentWeek < 6) {
          this.currentWeek++
        }
      } else {
        this.currentDay++
      }
    },
    togglePastWeeks() {
      this.showPastWeeks = !this.showPastWeeks
    },
    resetWorkoutSession() {
      this.workoutSession = {
        step: 'warmup',
        timer: 0,
        currentSet: 1,
        currentRep: 1,
        totalSets: 3,
        totalReps: 10,
        stretchCount: 0,
        totalStretches: 5,
        stretchDuration: 20,
        restDuration: 30,
      }
    },
    nextStep() {
      const steps = ['warmup', 'exercise', 'cooldown', 'complete']
      const currentIndex = steps.indexOf(this.workoutSession.step)
      if (currentIndex < steps.length - 1) {
        this.workoutSession.step = steps[currentIndex + 1]
      }
    }
  }
})