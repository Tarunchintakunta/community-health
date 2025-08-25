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
            <li class="nav-item">
              <router-link class="nav-link" to="/account">My Account</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-primary" to="/register">Sign Up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>