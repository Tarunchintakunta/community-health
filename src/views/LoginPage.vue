<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <h2 class="text-center mb-4">
                <i class="fas fa-sign-in-alt me-2"></i>Login
              </h2>
              
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    id="email"
                    placeholder="Enter your email"
                    required
                    @blur="validateField('email')"
                  />
                  <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    v-model="form.password" 
                    type="password" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    id="password"
                    placeholder="Enter your password"
                    required
                    @blur="validateField('password')"
                  />
                  <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
                </div>
                
                <div class="d-grid">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg"
                    :disabled="isLoading"
                  >
                    <i v-if="isLoading" class="fas fa-spinner fa-spin me-2"></i>
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                  </button>
                </div>
              </form>
              
              <div class="text-center mt-3">
                <p class="mb-0">
                  Don't have an account? 
                  <router-link to="/register" class="text-decoration-none">
                    Register here
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      isLoading: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    validateField(field) {
      const value = this.form[field]
      
      switch (field) {
        case 'email':
          if (!value) {
            this.errors.email = 'Email is required'
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            this.errors.email = 'Please enter a valid email address'
          } else {
            delete this.errors.email
          }
          break
        case 'password':
          if (!value) {
            this.errors.password = 'Password is required'
          } else if (value.length < 6) {
            this.errors.password = 'Password must be at least 6 characters'
          } else {
            delete this.errors.password
          }
          break
      }
    },
    async login() {
      // Validate all fields
      Object.keys(this.form).forEach(field => this.validateField(field))
      
      if (Object.keys(this.errors).length > 0) {
        return
      }
      
      this.isLoading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check against localStorage users
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => 
          u.email === this.form.email && u.password === this.form.password
        )
        
        if (user) {
          // Store current user in localStorage
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.$store.commit('SET_USER', user)
          
          // Redirect based on role
          if (user.role === 'admin') {
            this.$router.push('/admin-panel')
          } else if (user.role === 'coach') {
            this.$router.push('/coach-dashboard')
          } else {
            this.$router.push('/')
          }
        } else {
          this.errors.general = 'Invalid email or password'
        }
      } catch (error) {
        this.errors.general = 'Login failed. Please try again.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  border: none;
  border-radius: 15px;
}

.card-body {
  padding: 2rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.form-control {
  border-radius: 10px;
  border: 2px solid #e9ecef;
  padding: 12px 15px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.invalid-feedback {
  display: block;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.text-decoration-none {
  color: #667eea;
  font-weight: 600;
}

.text-decoration-none:hover {
  color: #764ba2;
}
</style>
