// Basic security for Vuex store
import { 
  sanitizeText, 
  sanitizeEmail, 
  sanitizeName, 
  logSecurityEvent
} from '@/utils/security'

// Clean up data before it goes into the store
export const securityMiddleware = (store) => {
  return (handler) => (mutation, state) => {
    logSecurityEvent('STORE_MUTATION', {
      type: mutation.type,
      payload: mutation.payload
    })
    
    // Clean user data
    if (mutation.type === 'SET_USER' && mutation.payload) {
      const user = {
        ...mutation.payload,
        firstName: sanitizeName(mutation.payload.firstName || ''),
        lastName: sanitizeName(mutation.payload.lastName || ''),
        email: sanitizeEmail(mutation.payload.email || '')
      }
      
      mutation.payload = user
    }
    
    // Clean program data
    if (mutation.type === 'SET_PROGRAMS' && Array.isArray(mutation.payload)) {
      const programs = mutation.payload.map(program => ({
        ...program,
        title: sanitizeText(program.title || '', 100),
        description: sanitizeText(program.description || '', 500),
        location: sanitizeText(program.location || '', 100),
        address: sanitizeText(program.address || '', 200),
        schedule: sanitizeText(program.schedule || '', 100),
        coach: sanitizeName(program.coach || '')
      }))
      
      mutation.payload = programs
    }
    
    // Clean rating data
    if (mutation.type === 'UPDATE_PROGRAM_RATING' && mutation.payload) {
      const rating = {
        ...mutation.payload,
        comment: sanitizeText(mutation.payload.comment || '', 500)
      }
      
      mutation.payload = rating
    }
    
    return handler(mutation, state)
  }
}

// Check if action data is valid
export const validateAction = (actionName, payload) => {
  const rules = {
    'ADD_PROGRAM': {
      required: ['title', 'description', 'location'],
      sanitize: ['title', 'description', 'location', 'address', 'schedule', 'coach']
    },
    'UPDATE_PROGRAM': {
      required: ['id'],
      sanitize: ['title', 'description', 'location', 'address', 'schedule', 'coach']
    },
    'ADD_RATING': {
      required: ['programId', 'rating'],
      sanitize: ['comment']
    }
  }
  
  const rule = rules[actionName]
  if (!rule) return { isValid: true, errors: [] }
  
  const errors = []
  
  if (rule.required) {
    rule.required.forEach(field => {
      if (!payload[field]) {
        errors.push(`${field} is required`)
      }
    })
  }
  
  if (rule.sanitize && payload) {
    rule.sanitize.forEach(field => {
      if (payload[field] && typeof payload[field] === 'string') {
        payload[field] = sanitizeText(payload[field], 1000)
      }
    })
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Log store actions
export const logStoreAction = (actionName, payload, result) => {
  logSecurityEvent('STORE_ACTION', {
    action: actionName,
    payload: payload ? Object.keys(payload) : [],
    success: result !== false,
    timestamp: new Date().toISOString()
  })
}

export default {
  securityMiddleware,
  validateAction,
  logStoreAction
}
