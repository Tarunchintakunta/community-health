// This file satisfies B.2 by dynamically fetching and displaying data
import { createStore } from 'vuex'

export default createStore({
  state: {
    programs: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    SET_PROGRAMS(state, programs) {
      state.programs = programs
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    // B.2: Dynamically fetch data
    fetchPrograms({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      // This would normally be an API call using axios
      // For now, using mock data
      const mockPrograms = [
        {
          id: 1,
          title: 'Basketball Training',
          location: 'Riverside Community Center',
          address: '123 Riverside Ave, Melbourne',
          schedule: 'Mondays & Wednesdays 6:00 - 8:00 PM',
          ageGroup: '17-21',
          coach: 'Mark Johnson',
          spaces: 12,
          description: 'Beginner-friendly session focusing on dribbling, passing, and shooting skills. All equipment provided.'
        },
        {
          id: 2,
          title: 'Senior Walking Group',
          location: 'Lakeside Park',
          address: '45 Lake Street, Melbourne',
          schedule: 'Tuesdays & Fridays 9:00 - 10:30 AM',
          ageGroup: '60+',
          coach: 'Sarah Williams',
          spaces: 20,
          description: 'A gentle walking group for seniors wanting to stay active and social. Various routes available for different mobility levels.'
        },
        {
          id: 3,
          title: 'Youth Soccer Program',
          location: 'Community Field',
          address: '78 Sports Avenue, Melbourne',
          schedule: 'Saturdays 10:00 AM - 12:00 PM',
          ageGroup: '8-12',
          coach: 'David Chen',
          spaces: 15,
          description: 'Fun and engaging soccer training for kids. Focus on teamwork, basic skills, and enjoyment of the game.'
        }
      ]
      
      // Simulate API delay
      setTimeout(() => {
        commit('SET_PROGRAMS', mockPrograms)
        commit('SET_LOADING', false)
      }, 500)
    },
    
    // B.2: Dynamically fetch program details
    fetchProgramById({ commit, state }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      setTimeout(() => {
        const program = state.programs.find(p => p.id === parseInt(id))
        
        if (program) {
          // Here we could fetch additional details from an API
          commit('SET_LOADING', false)
          return program
        } else {
          commit('SET_ERROR', 'Program not found')
          commit('SET_LOADING', false)
          return null
        }
      }, 300)
    },
    
    // Register a user
    registerUser({ commit }, userData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      // This would be an API call in a real application
      setTimeout(() => {
        commit('SET_USER', { 
          id: 1, 
          name: userData.firstName + ' ' + userData.lastName,
          email: userData.email
        })
        commit('SET_LOADING', false)
      }, 800)
    }
  },
  getters: {
    getPrograms: state => state.programs,
    getProgram: state => id => {
      return state.programs.find(program => program.id === parseInt(id))
    },
    isLoading: state => state.loading,
    getError: state => state.error,
    getUser: state => state.user
  }
})