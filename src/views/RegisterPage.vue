<template>
  <div class="register">
    <h1 class="mb-4">Sign Up</h1>
    
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Create Your Account</h5>
            
            <form @submit.prevent="submitForm">
              <!-- First Name -->
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  v-model="firstName"
                  :class="{'is-invalid': errors.firstName}"
                />
                <div v-if="errors.firstName" class="invalid-feedback">
                  {{ errors.firstName }}
                </div>
              </div>
              
              <!-- Last Name -->
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  v-model="lastName"
                  :class="{'is-invalid': errors.lastName}"
                />
                <div v-if="errors.lastName" class="invalid-feedback">
                  {{ errors.lastName }}
                </div>
              </div>
              
              <!-- Email - Validation Type 1: Email format -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  :class="{'is-invalid': errors.email}"
                />
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>
              
              <!-- Password - Validation Type 2: Minimum length and complexity -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  :class="{'is-invalid': errors.password}"
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password }}
                </div>
                <div class="form-text">
                  Password must be at least 8 characters and include at least one number and one special character.
                </div>
              </div>
              
              <!-- Confirm Password - Validation Type 3: Matching fields -->
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :class="{'is-invalid': errors.confirmPassword}"
                />
                <div v-if="errors.confirmPassword" class="invalid-feedback">
                  {{ errors.confirmPassword }}
                </div>
              </div>
              
              <!-- Age Group - Validation Type 4: Required selection -->
              <div class="mb-3">
                <label for="ageGroup" class="form-label">Age Group</label>
                <select
                  class="form-select"
                  id="ageGroup"
                  v-model="ageGroup"
                  :class="{'is-invalid': errors.ageGroup}"
                >
                  <option value="">Select Age Group</option>
                  <option value="under18">Under 18</option>
                  <option value="18-30">18-30</option>
                  <option value="31-45">31-45</option>
                  <option value="46-60">46-60</option>
                  <option value="over60">Over 60</option>
                </select>
                <div v-if="errors.ageGroup" class="invalid-feedback">
                  {{ errors.ageGroup }}
                </div>
              </div>
              
              <!-- User Role - C2: Role-based Authentication -->
              <div class="mb-3">
                <label for="role" class="form-label">Account Type</label>
                <select
                  class="form-select"
                  id="role"
                  v-model="role"
                  :class="{'is-invalid': errors.role}"
                >
                  <option value="">Select Account Type</option>
                  <option value="user">User - Join programs and activities</option>
                  <option value="coach">Coach - Create and manage programs</option>
                  <option value="admin">Admin - Manage all programs and users</option>
                </select>
                <div v-if="errors.role" class="invalid-feedback">
                  {{ errors.role }}
                </div>
                <div class="form-text">
                  Choose your account type based on how you plan to use the platform.
                </div>
              </div>
              
              <!-- Terms and Conditions - Validation Type 5: Required checkbox -->
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="termsCheck"
                  v-model="agreeToTerms"
                  :class="{'is-invalid': errors.agreeToTerms}"
                />
                <label class="form-check-label" for="termsCheck">
                  I agree to the Terms and Conditions
                </label>
                <div v-if="errors.agreeToTerms" class="invalid-feedback">
                  {{ errors.agreeToTerms }}
                </div>
              </div>
              
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { 
  sanitizeEmail, 
  sanitizeName, 
  sanitizeText, 
  checkPasswordStrength, 
  validateFormInput,
  logSecurityEvent,
  createRateLimiter
} from '@/utils/security'

export default {
  name: 'RegisterPage',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    // Form fields
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const ageGroup = ref('')
    const role = ref('')
    const agreeToTerms = ref(false)
    
    // Submission state
    const isSubmitting = ref(false)
    
    // Validation errors object
    const errors = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      ageGroup: '',
      role: '',
      agreeToTerms: ''
    })
    
    // C4: Security - Rate limiting for registration attempts
    const registrationRateLimiter = createRateLimiter(3, 300000) // 3 attempts per 5 minutes
    
    // C4: Security - Enhanced validation with sanitization
    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      Object.keys(errors).forEach(key => {
        errors[key] = ''
      })
      
      // C4: Security - Sanitize all inputs first
      const sanitizedFirstName = sanitizeName(firstName.value)
      const sanitizedLastName = sanitizeName(lastName.value)
      const sanitizedEmail = sanitizeEmail(email.value)
      
      // Validation Type 1: Required fields with sanitization
      const firstNameValidation = validateFormInput('First name', sanitizedFirstName, {
        required: true,
        minLength: 2,
        maxLength: 50
      })
      
      if (!firstNameValidation.isValid) {
        errors.firstName = firstNameValidation.errors[0]
        isValid = false
      }
      
      const lastNameValidation = validateFormInput('Last name', sanitizedLastName, {
        required: true,
        minLength: 2,
        maxLength: 50
      })
      
      if (!lastNameValidation.isValid) {
        errors.lastName = lastNameValidation.errors[0]
        isValid = false
      }
      
      // Validation Type 2: Email format with sanitization
      const emailValidation = validateFormInput('Email', sanitizedEmail, {
        required: true,
        type: 'email',
        maxLength: 100
      })
      
      if (!emailValidation.isValid) {
        errors.email = emailValidation.errors[0]
        isValid = false
      }
      
      // C4: Security - Enhanced password validation
      const passwordStrength = checkPasswordStrength(password.value)
      if (!password.value) {
        errors.password = 'Password is required'
        isValid = false
      } else if (passwordStrength.score < 3) {
        errors.password = `Password is too weak. ${passwordStrength.feedback.join(', ')}`
        isValid = false
      }
      
      // Validation Type 4: Matching fields
      if (password.value !== confirmPassword.value) {
        errors.confirmPassword = 'Passwords do not match'
        isValid = false
      }
      
      // Validation Type 5: Required selection
      if (!ageGroup.value) {
        errors.ageGroup = 'Please select an age group'
        isValid = false
      }
      
      // C2: Role validation
      if (!role.value) {
        errors.role = 'Please select an account type'
        isValid = false
      }
      
      // Validation Type 6: Required checkbox
      if (!agreeToTerms.value) {
        errors.agreeToTerms = 'You must agree to the terms and conditions'
        isValid = false
      }
      
      // C4: Security - Log validation attempts
      if (!isValid) {
        logSecurityEvent('FORM_VALIDATION_FAILED', {
          form: 'registration',
          errors: Object.keys(errors).filter(key => errors[key])
        })
      }
      
      return isValid
    }
    
    // C4: Security - Enhanced form submission with security measures
    const submitForm = async () => {
      // C4: Security - Check rate limiting
      const userKey = `registration_${email.value}`
      if (!registrationRateLimiter(userKey)) {
        errors.general = 'Too many registration attempts. Please try again in 5 minutes.'
        logSecurityEvent('RATE_LIMIT_EXCEEDED', {
          form: 'registration',
          email: email.value
        })
        return
      }
      
      if (validateForm()) {
        isSubmitting.value = true
        
        try {
          // C4: Security - Sanitize all user data before storage
          const sanitizedUser = {
            id: Date.now(),
            firstName: sanitizeName(firstName.value),
            lastName: sanitizeName(lastName.value),
            email: sanitizeEmail(email.value),
            password: password.value, // In real app, this would be hashed
            ageGroup: ageGroup.value,
            role: role.value,
            registeredAt: new Date().toISOString(),
            // C4: Security - Add security metadata
            securityMetadata: {
              ipAddress: 'client-side', // In real app, get from server
              userAgent: navigator.userAgent,
              registrationSource: 'web-app'
            }
          }
          
          // C4: Security - Check for existing user
          const users = JSON.parse(localStorage.getItem('users') || '[]')
          const existingUser = users.find(u => u.email === sanitizedUser.email)
          
          if (existingUser) {
            errors.email = 'An account with this email already exists'
            logSecurityEvent('DUPLICATE_REGISTRATION_ATTEMPT', {
              email: sanitizedUser.email
            })
            return
          }
          
          // Store user in localStorage
          users.push(sanitizedUser)
          localStorage.setItem('users', JSON.stringify(users))
          
          // Auto-login after registration
          localStorage.setItem('currentUser', JSON.stringify(sanitizedUser))
          store.commit('SET_USER', sanitizedUser)
          
          // C4: Security - Log successful registration
          logSecurityEvent('USER_REGISTERED', {
            userId: sanitizedUser.id,
            role: sanitizedUser.role,
            email: sanitizedUser.email
          })
          
          // Redirect based on role
          if (sanitizedUser.role === 'admin') {
            router.push('/admin-panel')
          } else if (sanitizedUser.role === 'coach') {
            router.push('/coach-dashboard')
          } else {
            router.push('/account')
          }
        } catch (error) {
          console.error('Registration error:', error)
          logSecurityEvent('REGISTRATION_ERROR', {
            error: error.message,
            email: email.value
          })
        } finally {
          isSubmitting.value = false
        }
      }
    }
    
    return {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      ageGroup,
      role,
      agreeToTerms,
      errors,
      isSubmitting,
      submitForm
    }
  }
}
</script>