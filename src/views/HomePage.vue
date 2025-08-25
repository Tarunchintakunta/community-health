<template>
  <div class="home">
    <!-- Enhanced Hero Section -->
    <section class="hero mb-5">
      <div class="jumbotron bg-transparent p-5">
        <div class="container">
          <h1 class="display-4 fw-bold">Promoting Health Through Community Sport</h1>
          <p class="lead mb-4">Join our inclusive sports programs designed for all ages and abilities. Build connections, improve fitness, and be part of a vibrant community.</p>
          <div class="hero-buttons">
            <router-link to="/find-activities" class="btn btn-primary btn-lg me-3">
              <i class="fas fa-search me-2"></i>Find Activities
            </router-link>
            <router-link to="/programs" class="btn btn-outline-primary btn-lg">
              <i class="fas fa-list me-2"></i>View Programs
            </router-link>
          </div>
        </div>
      </div>
    </section>
      
          <!-- Enhanced Featured Programs Section -->
    <section class="featured-programs mb-5">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Featured Programs</h2>
          <p class="section-subtitle">Discover our most popular community sports activities</p>
        </div>
        
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          
          <div v-else-if="programs.length === 0" class="col-12">
            <div class="alert alert-info text-center">
              <i class="fas fa-info-circle me-2"></i>
              No programs available at the moment. Please check back later.
            </div>
          </div>
          
          <div v-else v-for="program in programs" :key="program.id" class="col-md-4 mb-4">
            <div class="card program-card h-100">
              <div class="card-body d-flex flex-column">
                <div class="program-icon mb-3">
                  <i class="fas fa-basketball-ball fa-2x text-primary" v-if="program.title.includes('Basketball')"></i>
                  <i class="fas fa-walking fa-2x text-success" v-else-if="program.title.includes('Walking')"></i>
                  <i class="fas fa-futbol fa-2x text-warning" v-else-if="program.title.includes('Soccer')"></i>
                  <i class="fas fa-running fa-2x text-info" v-else></i>
                </div>
                
                <h5 class="card-title">{{ program.title }}</h5>
                <h6 class="card-subtitle mb-3">
                  <i class="fas fa-map-marker-alt me-2"></i>{{ program.location }}
                </h6>
                
                <div class="program-details mb-3">
                  <div class="detail-item mb-2">
                    <i class="fas fa-clock me-2 text-muted"></i>
                    <small class="text-muted">{{ program.schedule }}</small>
                  </div>
                  <div class="detail-item mb-2">
                    <i class="fas fa-users me-2 text-muted"></i>
                    <small class="text-muted">Age Group: {{ program.ageGroup }}</small>
                  </div>
                  <div class="detail-item mb-2">
                    <i class="fas fa-user-tie me-2 text-muted"></i>
                    <small class="text-muted">Coach: {{ program.coach }}</small>
                  </div>
                </div>
                
                <p class="card-text flex-grow-1">{{ program.description }}</p>
                
                <div class="mt-auto">
                  <router-link :to="'/programs/' + program.id" class="btn btn-primary w-100">
                    <i class="fas fa-info-circle me-2"></i>View Details
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <router-link to="/programs" class="btn btn-outline-primary btn-lg">
            <i class="fas fa-th-list me-2"></i>View All Programs
          </router-link>
        </div>
      </div>
    </section>
      
          <!-- Enhanced Community Testimonials Section -->
    <section class="testimonials mb-5">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Community Testimonials</h2>
          <p class="section-subtitle">Hear from our community members about their experiences</p>
        </div>
        
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card testimonial-card h-100">
              <div class="card-body">
                <div class="testimonial-avatar mb-3">
                  <i class="fas fa-user-circle fa-3x text-primary"></i>
                </div>
                <p class="card-text">"The walking group has been a lifesaver for me. I've made new friends and improved my health significantly. The community support is amazing!"</p>
                <div class="testimonial-author">
                  <h6 class="mb-1">Thomas, 72</h6>
                  <small class="text-muted">Senior Walking Group Member</small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-4">
            <div class="card testimonial-card h-100">
              <div class="card-body">
                <div class="testimonial-avatar mb-3">
                  <i class="fas fa-user-circle fa-3x text-success"></i>
                </div>
                <p class="card-text">"My kids love the basketball training sessions. The coaches are excellent and the schedule works perfectly for my work hours. Highly recommended!"</p>
                <div class="testimonial-author">
                  <h6 class="mb-1">Maya, 36</h6>
                  <small class="text-muted">Parent & Community Member</small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-4">
            <div class="card testimonial-card h-100">
              <div class="card-body">
                <div class="testimonial-avatar mb-3">
                  <i class="fas fa-user-circle fa-3x text-warning"></i>
                </div>
                <p class="card-text">"As a program coordinator, this platform has made managing registrations and tracking attendance so much easier. The community engagement is incredible!"</p>
                <div class="testimonial-author">
                  <h6 class="mb-1">Elena, 41</h6>
                  <small class="text-muted">Program Coordinator</small>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
    </section>
    
    <!-- New Call to Action Section -->
    <section class="cta-section mb-5">
      <div class="container">
        <div class="card bg-gradient-primary text-white text-center p-5">
          <div class="card-body">
            <h3 class="mb-3">Ready to Get Started?</h3>
            <p class="lead mb-4">Join our community today and discover the benefits of community sports</p>
            <div class="cta-buttons">
              <router-link to="/register" class="btn btn-light btn-lg me-3">
                <i class="fas fa-user-plus me-2"></i>Sign Up Now
              </router-link>
              <router-link to="/about" class="btn btn-outline-light btn-lg">
                <i class="fas fa-info-circle me-2"></i>Learn More
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script>
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'HomePage',
    setup() {
      const store = useStore()
      
      // B.2: Dynamically fetch data when component mounts
      onMounted(() => {
        store.dispatch('fetchPrograms')
      })
      
      // B.2: Using dynamic data from store
      const programs = computed(() => store.getters.getPrograms)
      const loading = computed(() => store.getters.isLoading)
      
      return {
        programs,
        loading
      }
      }
}
</script>

<style scoped>
.section-header {
  margin-bottom: 3rem;
}

.section-title {
  color: var(--text-primary);
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.program-icon {
  text-align: center;
  padding: 1rem;
  background: var(--bg-accent);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
}

.testimonial-avatar {
  text-align: center;
}

.testimonial-author {
  text-align: center;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>