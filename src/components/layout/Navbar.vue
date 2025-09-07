<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-dumbbell me-2"></i>
        Community Sports Hub
      </router-link>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/programs">Programs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/find-activities">Find Activities</router-link>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <!-- Show only for logged-in users -->
            <template v-if="currentUser">
              <li class="nav-item">
                <router-link class="nav-link" to="/account">
                  <i class="fas fa-user me-1"></i>My Account
                </router-link>
              </li>
              
              <!-- Show only for coaches -->
              <li v-if="currentUser.role === 'coach'" class="nav-item">
                <router-link class="nav-link" to="/coach-dashboard">
                  <i class="fas fa-chalkboard-teacher me-1"></i>Coach Dashboard
                </router-link>
              </li>
              
              <!-- Show only for admins -->
              <li v-if="currentUser.role === 'admin'" class="nav-item">
                <router-link class="nav-link" to="/admin-panel">
                  <i class="fas fa-cog me-1"></i>Admin Panel
                </router-link>
              </li>
              
              <li class="nav-item">
                <button @click="logout" class="btn btn-outline-danger btn-sm">
                  <i class="fas fa-sign-out-alt me-1"></i>Logout
                </button>
              </li>
            </template>
            
            <!-- Show only for non-logged-in users -->
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">
                  <i class="fas fa-sign-in-alt me-1"></i>Login
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="btn btn-primary" to="/register">
                  <i class="fas fa-user-plus me-1"></i>Sign Up
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'Navbar',
    computed: {
      ...mapState(['user']),
      currentUser() {
        return this.user || JSON.parse(localStorage.getItem('currentUser') || 'null')
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('currentUser')
        this.$store.commit('SET_USER', null)
        this.$router.push('/')
      }
    }
  }
  </script>