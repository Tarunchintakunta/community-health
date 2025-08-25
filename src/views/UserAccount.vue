<template>
  <div class="user-account">
    <h1 class="mb-4">My Account</h1>
    
    <div v-if="!user" class="text-center my-5">
      <p>Please sign in or create an account to view this page.</p>
      <div class="mt-3">
        <router-link to="/register" class="btn btn-primary me-2">Create Account</router-link>
        <button class="btn btn-outline-primary">Sign In</button>
      </div>
    </div>
    
    <div v-else class="row">
      <div class="col-lg-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Profile</h5>
            <p class="card-text"><strong>Name:</strong> {{ user.name }}</p>
            <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
            <button class="btn btn-sm btn-outline-primary">Edit Profile</button>
          </div>
        </div>
      </div>
      
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title mb-0">My Programs</h5>
          </div>
          <div class="card-body">
            <p class="card-text">You haven't registered for any programs yet.</p>
            <router-link to="/programs" class="btn btn-primary">Browse Programs</router-link>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Health Dashboard</h5>
          </div>
          <div class="card-body">
            <p class="card-text">Your health tracking dashboard will appear here once you start participating in programs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserAccount',
  setup() {
    const store = useStore()
    
    // B.2: Dynamic data binding from Vuex store
    const user = computed(() => store.getters.getUser)
    
    return {
      user
    }
  }
}
</script>
