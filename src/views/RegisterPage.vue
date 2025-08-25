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
      agreeToTerms: ''
    })
    
    // B.1: Implement validation for user inputs
    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      Object.keys(errors).forEach(key => {
        errors[key] = ''
      })
      
      // Validation Type 1: Required fields
      if (!firstName.value.trim()) {
        errors.firstName = 'First name is required'
        isValid = false
      }
      
      if (!lastName.value.trim()) {
        errors.lastName = 'Last name is required'
        isValid = false
      }
      
      // Validation Type 2: Email format
      if (!email.value.trim()) {
        errors.email = 'Email is required'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.email = 'Invalid email format'
        isValid = false
      }
      
      // Validation Type 3: Password complexity
      if (!password.value) {
        errors.password = 'Password is required'
        isValid = false
      } else if (password.value.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
        isValid = false
      } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(password.value)) {
        errors.password = 'Password must contain at least one number and one special character'
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
      
      // Validation Type 6: Required checkbox
      if (!agreeToTerms.value) {
        errors.agreeToTerms = 'You must agree to the terms and conditions'
        isValid = false
      }
      
      return isValid
    }
    
    // Form submission handler
    const submitForm = async () => {
      if (validateForm()) {
        isSubmitting.value = true
        
        try {
          // B.2: Using store action to dynamically update data
          await store.dispatch('registerUser', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            ageGroup: ageGroup.value
          })
          
          // Redirect to account page
          router.push('/account')
        } catch (error) {
          console.error('Registration error:', error)
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
      agreeToTerms,
      errors,
      isSubmitting,
      submitForm
    }
  }
}
</script>