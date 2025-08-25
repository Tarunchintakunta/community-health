<template>
  <div class="program-details">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else-if="!program" class="alert alert-warning">
      Program not found. <router-link to="/programs">View all programs</router-link>
    </div>
    
    <div v-else>
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item"><router-link to="/programs">Programs</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ program.title }}</li>
        </ol>
      </nav>
      
      <div class="row">
        <div class="col-lg-8">
          <h1 class="mb-3">{{ program.title }}</h1>
          
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Program Details</h5>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Location:</th>
                    <td>{{ program.location }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address:</th>
                    <td>{{ program.address }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Schedule:</th>
                    <td>{{ program.schedule }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Age Group:</th>
                    <td>{{ program.ageGroup }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Coach:</th>
                    <td>{{ program.coach }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Spaces Available:</th>
                    <td>{{ program.spaces }}</td>
                  </tr>
                </tbody>
              </table>
              
              <h5 class="mt-4">Description</h5>
              <p>{{ program.description }}</p>
            </div>
          </div>
          
          <div class="mb-4">
            <h5>Program Benefits</h5>
            <ul class="list-group">
              <li class="list-group-item">Improve physical fitness and health</li>
              <li class="list-group-item">Build social connections and community</li>
              <li class="list-group-item">Learn new skills with expert guidance</li>
              <li class="list-group-item">Regular activity for mental wellbeing</li>
            </ul>
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="card-title mb-0">Registration</h5>
            </div>
            <div class="card-body">
              <p class="card-text">Ready to join this program? Register now to secure your spot!</p>
              <p class="card-text"><strong>Available Spaces:</strong> {{ program.spaces }}</p>
              <button class="btn btn-primary w-100">Register Now</button>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Contact Information</h5>
            </div>
            <div class="card-body">
              <p class="mb-2"><strong>Coach:</strong> {{ program.coach }}</p>
              <p class="mb-2"><strong>Email:</strong> coach@communitysportshub.org</p>
              <p class="mb-2"><strong>Phone:</strong> (03) 1234 5678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'ProgramDetails',
  setup() {
    const store = useStore()
    const route = useRoute()
    
    // B.2: Dynamically fetch data
    onMounted(() => {
      if (store.getters.getPrograms.length === 0) {
        store.dispatch('fetchPrograms')
      }
    })
    
    // B.2: Using dynamic route params and computed properties
    const programId = computed(() => route.params.id)
    const program = computed(() => store.getters.getProgram(parseInt(programId.value)))
    const loading = computed(() => store.getters.isLoading)
    
    // Watch for changes in the program ID and reload data if needed
    watch(programId, (newId) => {
      if (!program.value) {
        store.dispatch('fetchProgramById', newId)
      }
    })
    
    return {
      program,
      loading
    }
  }
}
</script>
