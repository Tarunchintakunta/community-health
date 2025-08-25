<template>
    <div class="programs">
      <h1 class="mb-4">Our Programs</h1>
      
      <div class="filters mb-4">
        <div class="row g-3">
          <div class="col-md-4">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search programs..." 
              v-model="searchQuery"
            >
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="ageFilter">
              <option value="">All Age Groups</option>
              <option value="8-12">Children (8-12)</option>
              <option value="13-16">Teens (13-16)</option>
              <option value="17-21">Young Adults (17-21)</option>
              <option value="22-59">Adults (22-59)</option>
              <option value="60+">Seniors (60+)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      
      <div v-else-if="filteredPrograms.length === 0" class="alert alert-info">
        No programs match your search criteria. Please try different filters.
      </div>
      
      <div v-else class="row">
        <div v-for="program in filteredPrograms" :key="program.id" class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ program.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ program.location }}</h6>
              <p class="card-text">
                <small>
                  <strong>Schedule:</strong> {{ program.schedule }}<br>
                  <strong>Age Group:</strong> {{ program.ageGroup }}<br>
                  <strong>Spaces Available:</strong> {{ program.spaces }}
                </small>
              </p>
              <p class="card-text">{{ program.description }}</p>
            </div>
            <div class="card-footer bg-transparent border-top-0">
              <router-link :to="'/programs/' + program.id" class="btn btn-primary">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'ProgramsPage',
    setup() {
      const store = useStore()
      const searchQuery = ref('')
      const ageFilter = ref('')
      
      // B.2: Dynamically fetch data
      onMounted(() => {
        if (store.getters.getPrograms.length === 0) {
          store.dispatch('fetchPrograms')
        }
      })
      
      // B.2: Using computed properties to dynamically filter data
      const programs = computed(() => store.getters.getPrograms)
      const loading = computed(() => store.getters.isLoading)
      
      const filteredPrograms = computed(() => {
        return programs.value.filter(program => {
          // Filter by search query
          const matchesSearch = program.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                               program.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                               program.location.toLowerCase().includes(searchQuery.value.toLowerCase())
          
          // Filter by age group
          const matchesAge = ageFilter.value ? program.ageGroup.includes(ageFilter.value) : true
          
          return matchesSearch && matchesAge
        })
      })
      
      return {
        programs,
        loading,
        searchQuery,
        ageFilter,
        filteredPrograms
      }
    }
  }
  </script>