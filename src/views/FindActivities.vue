<template>
  <div class="find-activities">
    <h1 class="mb-4">Find Activities Near You</h1>
    
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Search Activities..." 
          v-model="searchQuery"
        >
      </div>
      <div class="col-md-3 mb-3">
        <select class="form-select" v-model="activityType">
          <option value="">All Activity Types</option>
          <option value="Basketball">Basketball</option>
          <option value="Walking">Walking</option>
          <option value="Soccer">Soccer</option>
          <option value="Swimming">Swimming</option>
          <option value="Yoga">Yoga</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Location" 
          v-model="location"
        >
      </div>
      <div class="col-md-2 mb-3">
        <button class="btn btn-primary w-100" @click="searchActivities">Search</button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6 mb-4">
        <h4 class="mb-3">Programs</h4>
        <div v-if="loading" class="text-center my-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        
        <div v-else-if="filteredPrograms.length === 0" class="alert alert-info">
          No programs match your search criteria. Please try different filters.
        </div>
        
        <div v-else class="program-list">
          <div v-for="program in filteredPrograms" :key="program.id" class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ program.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ program.location }}</h6>
              <p class="card-text">
                <small>
                  <strong>Schedule:</strong> {{ program.schedule }}<br>
                  <strong>Age Group:</strong> {{ program.ageGroup }}
                </small>
              </p>
              <router-link :to="'/programs/' + program.id" class="btn btn-sm btn-primary">Details</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <h4 class="mb-3">Map View</h4>
        <div class="map-container bg-light rounded" style="height: 400px; display: flex; align-items: center; justify-content: center;">
          <p class="text-muted">Interactive map will be displayed here.</p>
          <!-- In a real app, this would be replaced with a proper map component -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FindActivities',
  setup() {
    const store = useStore()
    const searchQuery = ref('')
    const activityType = ref('')
    const location = ref('')
    
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
        const matchesSearch = searchQuery.value === '' || 
                             program.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                             program.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        // Filter by activity type (simplified for demo)
        const matchesType = activityType.value === '' || 
                           program.title.includes(activityType.value)
        
        // Filter by location
        const matchesLocation = location.value === '' || 
                               program.location.toLowerCase().includes(location.value.toLowerCase())
        
        return matchesSearch && matchesType && matchesLocation
      })
    })
    
    // Method to trigger search (for UX purposes)
    const searchActivities = () => {
      console.log('Searching with parameters:', {
        query: searchQuery.value,
        type: activityType.value,
        location: location.value
      })
      // In a real app, this might trigger an API call or other action
    }
    
    return {
      programs,
      loading,
      searchQuery,
      activityType,
      location,
      filteredPrograms,
      searchActivities
    }
  }
}
</script>
