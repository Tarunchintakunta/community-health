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
import { 
  sanitizeEmail, 
  sanitizeText, 
  logSecurityEvent,
  createRateLimiter
} from '@/utils/security'

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
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      isLoading: false,
      // C4: Security - Rate limiting for login attempts
      loginRateLimiter: createRateLimiter(5, 300000) // 5 attempts per 5 minutes
    }
  },
  methods: {
    // C4: Security - Enhanced field validation with sanitization
    validateField(field) {
      const value = this.form[field]
      
      switch (field) {
        case 'email':
          const sanitizedEmail = sanitizeEmail(value)
          if (!sanitizedEmail) {
            this.errors.email = 'Email is required'
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
            this.errors.email = 'Please enter a valid email address'
          } else {
            delete this.errors.email
            // Update form with sanitized value
            this.form.email = sanitizedEmail
          }
          break
        case 'password':
          const sanitizedPassword = sanitizeText(value, 100)
          if (!sanitizedPassword) {
            this.errors.password = 'Password is required'
          } else if (sanitizedPassword.length < 6) {
            this.errors.password = 'Password must be at least 6 characters'
          } else {
            delete this.errors.password
          }
          break
      }
    },
    
    // C4: Security - Enhanced login with security measures
    async login() {
      // C4: Security - Check rate limiting
      const userKey = `login_${this.form.email}`
      if (!this.loginRateLimiter(userKey)) {
        this.errors.general = 'Too many login attempts. Please try again in 5 minutes.'
        logSecurityEvent('LOGIN_RATE_LIMIT_EXCEEDED', {
          email: this.form.email
        })
        return
      }
      
      // Validate all fields
      Object.keys(this.form).forEach(field => this.validateField(field))
      
      if (Object.keys(this.errors).length > 0) {
        logSecurityEvent('LOGIN_VALIDATION_FAILED', {
          email: this.form.email,
          errors: Object.keys(this.errors)
        })
        return
      }
      
      this.isLoading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // C4: Security - Sanitize inputs before checking
        const sanitizedEmail = sanitizeEmail(this.form.email)
        const sanitizedPassword = sanitizeText(this.form.password, 100)
        
        // Check against localStorage users
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => 
          u.email === sanitizedEmail && u.password === sanitizedPassword
        )
        
        if (user) {
          // C4: Security - Log successful login
          logSecurityEvent('USER_LOGIN_SUCCESS', {
            userId: user.id,
            email: user.email,
            role: user.role
          })
          
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
          // C4: Security - Log failed login attempt
          logSecurityEvent('USER_LOGIN_FAILED', {
            email: sanitizedEmail,
            reason: 'invalid_credentials'
          })
          this.errors.general = 'Invalid email or password'
        }
      } catch (error) {
        // C4: Security - Log login error
        logSecurityEvent('LOGIN_ERROR', {
          email: this.form.email,
          error: error.message
        })
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
