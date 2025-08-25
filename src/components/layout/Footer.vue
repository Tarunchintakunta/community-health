<template>
      <footer class="py-4 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5><i class="fas fa-dumbbell me-2"></i>Community Sports Hub</h5>
          <p>Promoting health through community sport activities.</p>
        </div>
          <div class="col-md-4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/programs">Programs</router-link></li>
              <li><router-link to="/find-activities">Find Activities</router-link></li>
              <li><router-link to="/about">About Us</router-link></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Contact Us</h5>
            <address>
              123 Sports Street<br>
              Melbourne, VIC 3000<br>
              <a href="mailto:info@communitysportshub.org">info@communitysportshub.org</a><br>
              <a href="tel:+61312345678">(03) 1234 5678</a>
            </address>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col text-center">
            <p class="mb-0">&copy; {{ currentYear }} Community Sports Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    computed: {
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
  </script>