<template>
  <div class="rating-system">
    <h4 class="mb-3">
      <i class="fas fa-star me-2"></i>Rate this Program
    </h4>
    
    <!-- Star Rating Input -->
    <div class="star-rating mb-3" v-if="!hasRated">
      <span 
        v-for="star in 5" 
        :key="star" 
        @click="setRating(star)"
        :class="{ 'active': star <= currentRating }"
        class="star"
      >
        ⭐
      </span>
    </div>
    
    <!-- Rating Display -->
    <div class="rating-display mb-3">
      <div class="stars mb-2">
        <span v-for="star in 5" :key="star" :class="{ 'filled': star <= averageRating }">
          {{ star <= averageRating ? '⭐' : '☆' }}
        </span>
      </div>
      <p class="mb-0">
        <strong>Average: {{ averageRating.toFixed(1) }}/5</strong> 
        <span class="text-muted">({{ totalRatings }} review{{ totalRatings !== 1 ? 's' : '' }})</span>
      </p>
    </div>
    
    <!-- User's Rating -->
    <div v-if="userRating" class="user-rating">
      <div class="alert alert-info d-flex justify-content-between align-items-center">
        <span>
          <i class="fas fa-check-circle me-2"></i>
          Your rating: {{ userRating }}/5
        </span>
        <button @click="removeRating" class="btn btn-sm btn-outline-danger">
          <i class="fas fa-times me-1"></i>Remove
        </button>
      </div>
    </div>
    
    <!-- Login prompt for non-logged-in users -->
    <div v-if="!isLoggedIn" class="login-prompt">
      <div class="alert alert-warning">
        <i class="fas fa-info-circle me-2"></i>
        Please <router-link to="/login" class="alert-link">login</router-link> to rate programs
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RatingSystem',
  props: {
    programId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      currentRating: 0,
      userRating: null
    }
  },
  computed: {
    ...mapState(['user']),
    isLoggedIn() {
      return this.user || JSON.parse(localStorage.getItem('currentUser') || 'null')
    },
    ratings() {
      const allRatings = JSON.parse(localStorage.getItem('programRatings') || '{}')
      return allRatings[this.programId] || []
    },
    averageRating() {
      if (this.ratings.length === 0) return 0
      return this.ratings.reduce((sum, rating) => sum + rating.rating, 0) / this.ratings.length
    },
    totalRatings() {
      return this.ratings.length
    },
    hasRated() {
      if (!this.isLoggedIn) return true
      
      const currentUser = this.isLoggedIn
      return this.ratings.some(rating => rating.userId === currentUser.id)
    }
  },
  mounted() {
    this.loadUserRating()
  },
  methods: {
    loadUserRating() {
      if (!this.isLoggedIn) return
      
      const currentUser = this.isLoggedIn
      const userRating = this.ratings.find(rating => rating.userId === currentUser.id)
      if (userRating) {
        this.userRating = userRating.rating
        this.currentRating = userRating.rating
      }
    },
    setRating(rating) {
      if (!this.isLoggedIn) {
        this.$router.push('/login')
        return
      }
      
      this.currentRating = rating
      this.userRating = rating
      
      // Save rating to localStorage
      const allRatings = JSON.parse(localStorage.getItem('programRatings') || '{}')
      const programRatings = allRatings[this.programId] || []
      
      // Remove existing rating from this user
      const filteredRatings = programRatings.filter(r => r.userId !== this.isLoggedIn.id)
      
      // Add new rating
      filteredRatings.push({
        userId: this.isLoggedIn.id,
        rating: rating,
        timestamp: new Date().toISOString()
      })
      
      allRatings[this.programId] = filteredRatings
      localStorage.setItem('programRatings', JSON.stringify(allRatings))
      
      // Update Vuex store
      this.$store.commit('UPDATE_PROGRAM_RATING', {
        programId: this.programId,
        averageRating: this.averageRating,
        totalRatings: this.totalRatings
      })
      
      // Show success message
      this.$emit('rating-updated', {
        programId: this.programId,
        rating: rating,
        averageRating: this.averageRating,
        totalRatings: this.totalRatings
      })
    },
    removeRating() {
      if (!this.isLoggedIn) return
      
      const allRatings = JSON.parse(localStorage.getItem('programRatings') || '{}')
      const programRatings = allRatings[this.programId] || []
      
      // Remove user's rating
      const filteredRatings = programRatings.filter(r => r.userId !== this.isLoggedIn.id)
      allRatings[this.programId] = filteredRatings
      localStorage.setItem('programRatings', JSON.stringify(allRatings))
      
      this.userRating = null
      this.currentRating = 0
      
      // Update Vuex store
      this.$store.commit('UPDATE_PROGRAM_RATING', {
        programId: this.programId,
        averageRating: this.averageRating,
        totalRatings: this.totalRatings
      })
      
      // Show success message
      this.$emit('rating-removed', {
        programId: this.programId,
        averageRating: this.averageRating,
        totalRatings: this.totalRatings
      })
    }
  }
}
</script>

<style scoped>
.rating-system {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.star-rating {
  display: flex;
  gap: 5px;
  margin-bottom: 1rem;
}

.star {
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  filter: grayscale(100%);
}

.star:hover,
.star.active {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.rating-display .stars {
  display: flex;
  gap: 3px;
  margin-bottom: 0.5rem;
}

.rating-display .stars span {
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.rating-display .stars span.filled {
  filter: grayscale(0%);
}

.user-rating .alert {
  margin-bottom: 0;
  border-radius: 8px;
}

.login-prompt .alert {
  margin-bottom: 0;
  border-radius: 8px;
}

.alert-link {
  font-weight: 600;
  text-decoration: none;
}

.alert-link:hover {
  text-decoration: underline;
}

.btn-outline-danger {
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.btn-outline-danger:hover {
  transform: translateY(-1px);
}
</style>
