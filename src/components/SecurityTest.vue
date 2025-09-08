<template>
  <div class="security-test">
    <div class="container">
      <h2 class="mb-4">
        <i class="fas fa-shield-alt me-2"></i>Security Test Page
      </h2>
      
      <!-- XSS Test -->
      <div class="card mb-4">
        <div class="card-header">
          <h5><i class="fas fa-bug me-2"></i>XSS Protection Test</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <h6>Try some XSS:</h6>
              <textarea 
                v-model="xssInput" 
                v-sanitize-input
                class="form-control" 
                rows="3"
                placeholder="Try: <script>alert('XSS')</script>"
              ></textarea>
            </div>
            <div class="col-md-6">
              <h6>How it looks:</h6>
              <div class="border p-3 bg-light">
                <div v-sanitize="xssInput"></div>
              </div>
            </div>
          </div>
          
          <div class="mt-3">
            <h6>Different ways to clean it:</h6>
            <div class="row">
              <div class="col-md-4">
                <strong>Escape:</strong>
                <div class="border p-2 bg-light" v-sanitize:escape="xssInput"></div>
              </div>
              <div class="col-md-4">
                <strong>Strip tags:</strong>
                <div class="border p-2 bg-light" v-sanitize:text="xssInput"></div>
              </div>
              <div class="col-md-4">
                <strong>Sanitize:</strong>
                <div class="border p-2 bg-light" v-sanitize:html="xssInput"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Password Test -->
      <div class="card mb-4">
        <div class="card-header">
          <h5><i class="fas fa-key me-2"></i>Password Strength Test</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <label for="passwordTest" class="form-label">Try a password:</label>
              <input 
                type="password" 
                id="passwordTest"
                v-model="passwordTest" 
                v-sanitize-input
                class="form-control"
                placeholder="Enter password to test"
              >
            </div>
            <div class="col-md-6">
              <h6>How strong is it?</h6>
              <div v-if="passwordStrength">
                <div class="progress mb-2">
                  <div 
                    class="progress-bar" 
                    :class="strengthClass"
                    :style="{ width: (passwordStrength.score * 20) + '%' }"
                  ></div>
                </div>
                <p class="mb-1">
                  <strong>{{ passwordStrength.score }}/5</strong>
                </p>
                <ul class="list-unstyled">
                  <li v-for="feedback in passwordStrength.feedback" :key="feedback" class="text-danger">
                    <i class="fas fa-times me-1"></i>{{ feedback }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Form Test -->
      <div class="card mb-4">
        <div class="card-header">
          <h5><i class="fas fa-check-circle me-2"></i>Form Validation Test</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="testValidation" v-secure-form>
            <div class="row">
              <div class="col-md-6">
                <label for="emailTest" class="form-label">Email:</label>
                <input 
                  type="email" 
                  id="emailTest"
                  v-model="validationForm.email" 
                  v-sanitize-input
                  class="form-control"
                  placeholder="test@example.com"
                >
                <div v-if="validationErrors.email" class="text-danger small">
                  {{ validationErrors.email }}
                </div>
              </div>
              <div class="col-md-6">
                <label for="nameTest" class="form-label">Name:</label>
                <input 
                  type="text" 
                  id="nameTest"
                  v-model="validationForm.name" 
                  v-sanitize-input
                  class="form-control"
                  placeholder="John Doe"
                >
                <div v-if="validationErrors.name" class="text-danger small">
                  {{ validationErrors.name }}
                </div>
              </div>
            </div>
            <div class="mt-3">
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-test-tube me-1"></i>Test It
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Security Logs -->
      <div class="card mb-4">
        <div class="card-header">
          <h5><i class="fas fa-clipboard-list me-2"></i>Security Logs</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Event</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in securityLogs" :key="log.timestamp">
                  <td>{{ formatTime(log.timestamp) }}</td>
                  <td>
                    <span class="badge" :class="getEventBadgeClass(log.event)">
                      {{ log.event }}
                    </span>
                  </td>
                  <td>{{ JSON.stringify(log.details) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button @click="clearLogs" class="btn btn-sm btn-outline-danger">
            <i class="fas fa-trash me-1"></i>Clear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { 
  checkPasswordStrength, 
  validateFormInput, 
  logSecurityEvent 
} from '@/utils/security'

export default {
  name: 'SecurityTest',
  setup() {
    const xssInput = ref('')
    const passwordTest = ref('')
    const validationForm = ref({
      email: '',
      name: ''
    })
    const validationErrors = ref({})
    const securityLogs = ref([])
    
    // Password strength analysis
    const passwordStrength = computed(() => {
      if (!passwordTest.value) return null
      return checkPasswordStrength(passwordTest.value)
    })
    
    const strengthClass = computed(() => {
      if (!passwordStrength.value) return ''
      const score = passwordStrength.value.score
      if (score <= 2) return 'bg-danger'
      if (score <= 3) return 'bg-warning'
      if (score <= 4) return 'bg-info'
      return 'bg-success'
    })
    
    // Test the form validation
    const testValidation = () => {
      validationErrors.value = {}
      
      const emailValidation = validateFormInput('Email', validationForm.value.email, {
        required: true,
        type: 'email'
      })
      
      if (!emailValidation.isValid) {
        validationErrors.value.email = emailValidation.errors[0]
      }
      
      const nameValidation = validateFormInput('Name', validationForm.value.name, {
        required: true,
        minLength: 2,
        maxLength: 50
      })
      
      if (!nameValidation.isValid) {
        validationErrors.value.name = nameValidation.errors[0]
      }
      
      logSecurityEvent('VALIDATION_TEST', {
        email: validationForm.value.email,
        name: validationForm.value.name,
        errors: Object.keys(validationErrors.value)
      })
      
      loadSecurityLogs()
    }
    
    // Get the security logs
    const loadSecurityLogs = () => {
      const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]')
      securityLogs.value = logs.slice(-20).reverse()
    }
    
    // Clear the logs
    const clearLogs = () => {
      localStorage.removeItem('securityLogs')
      securityLogs.value = []
      logSecurityEvent('LOGS_CLEARED')
    }
    
    // Format the timestamp nicely
    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleString()
    }
    
    // Color code the event badges
    const getEventBadgeClass = (event) => {
      if (event.includes('ERROR') || event.includes('FAILED')) return 'bg-danger'
      if (event.includes('WARNING') || event.includes('LIMIT')) return 'bg-warning'
      if (event.includes('SUCCESS') || event.includes('LOGIN')) return 'bg-success'
      return 'bg-info'
    }
    
    onMounted(() => {
      loadSecurityLogs()
      logSecurityEvent('SECURITY_TEST_LOADED')
    })
    
    return {
      xssInput,
      passwordTest,
      validationForm,
      validationErrors,
      securityLogs,
      passwordStrength,
      strengthClass,
      testValidation,
      clearLogs,
      formatTime,
      getEventBadgeClass
    }
  }
}
</script>

<style scoped>
.security-test {
  padding: 2rem 0;
}

.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.progress {
  height: 8px;
}

.border {
  min-height: 60px;
}

.table th {
  background-color: #f8f9fa;
}

.badge {
  font-size: 0.75em;
}
</style>
