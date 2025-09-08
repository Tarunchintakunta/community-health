// Basic XSS protection by stripping dangerous HTML
export const sanitizeHTML = (input) => {
  if (!input || typeof input !== 'string') return input
  

  let clean = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')
  
  return clean
}

// Remove all HTML tags 
export const stripHTML = (input) => {
  if (!input || typeof input !== 'string') return input
  return input.replace(/<[^>]*>/g, '')
}

// Basic HTML escaping for display
export const escapeHTML = (input) => {
  if (!input || typeof input !== 'string') return input
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Clean up email addresses
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') return ''
  
  const clean = email.trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  return emailRegex.test(clean) ? clean : ''
}

// Clean up names - only allow letters, spaces, hyphens, apostrophes
export const sanitizeName = (name) => {
  if (!name || typeof name !== 'string') return ''
  
  return name
    .trim()
    .substring(0, 50)
    .replace(/[^a-zA-Z\s\-']/g, '')
}

// Clean up text input
export const sanitizeText = (text, maxLength = 1000) => {
  if (!text || typeof text !== 'string') return ''
  
  return stripHTML(text)
    .trim()
    .substring(0, maxLength)
    .replace(/[<>'"&]/g, '')
}

// Make sure numbers are actually numbers and within reasonable bounds
export const sanitizeNumber = (input, min = 0, max = 999999) => {
  const num = parseFloat(input)
  if (isNaN(num)) return 0
  
  return Math.max(min, Math.min(max, num))
}

// Check if password is strong enough
export const checkPasswordStrength = (password) => {
  if (!password || typeof password !== 'string') return { score: 0, feedback: [] }
  
  const feedback = []
  let score = 0
  
  // Basic checks
  if (password.length >= 8) {
    score++
  } else {
    feedback.push('At least 8 characters')
  }
  
  if (/[A-Z]/.test(password)) {
    score++
  } else {
    feedback.push('Uppercase letter')
  }
  
  if (/[a-z]/.test(password)) {
    score++
  } else {
    feedback.push('Lowercase letter')
  }
  
  if (/\d/.test(password)) {
    score++
  } else {
    feedback.push('Number')
  }
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++
  } else {
    feedback.push('Special character')
  }
  
  // Check for common passwords
  const common = ['password', '123456', 'qwerty', 'abc123', 'password123']
  if (common.includes(password.toLowerCase())) {
    score = Math.max(0, score - 2)
    feedback.push('Too common')
  }
  
  return { score, feedback }
}

// Generate a random token for CSRF protection
export const generateCSRFToken = () => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Check if CSRF token matches
export const validateCSRFToken = (token, storedToken) => {
  return token && storedToken && token === storedToken
}

// Basic SQL injection protection - remove dangerous patterns
export const sanitizeForDatabase = (input) => {
  if (!input || typeof input !== 'string') return input
  
  return input
    .replace(/['"`;]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/union|select|insert|update|delete|drop|create|alter/gi, '')
    .trim()
}

// Simple rate limiter to prevent spam
export const createRateLimiter = (maxAttempts = 5, windowMs = 60000) => {
  const attempts = new Map()
  
  return (key) => {
    const now = Date.now()
    const userAttempts = attempts.get(key) || []
    
    // Clean up old attempts
    const recent = userAttempts.filter(time => now - time < windowMs)
    
    if (recent.length >= maxAttempts) {
      return false
    }
    
    recent.push(now)
    attempts.set(key, recent)
    
    return true
  }
}

// Simple encoding for localStorage (not real encryption)
export const encryptData = (data) => {
  try {
    return btoa(JSON.stringify(data))
  } catch (error) {
    console.error('Encoding error:', error)
    return null
  }
}

// Simple decoding for localStorage
export const decryptData = (encodedData) => {
  try {
    return JSON.parse(atob(encodedData))
  } catch (error) {
    console.error('Decoding error:', error)
    return null
  }
}

// Basic form validation
export const validateFormInput = (fieldName, value, rules = {}) => {
  const errors = []
  
  if (rules.required && (!value || value.trim() === '')) {
    errors.push(`${fieldName} is required`)
    return { isValid: false, errors }
  }
  
  if (!value || value.trim() === '') {
    return { isValid: true, errors: [] }
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`At least ${rules.minLength} characters`)
  }
  
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`No more than ${rules.maxLength} characters`)
  }
  
  if (rules.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      errors.push('Valid email required')
    }
  }
  
  if (rules.type === 'number') {
    const num = parseFloat(value)
    if (isNaN(num)) {
      errors.push('Must be a number')
    } else {
      if (rules.min !== undefined && num < rules.min) {
        errors.push(`At least ${rules.min}`)
      }
      if (rules.max !== undefined && num > rules.max) {
        errors.push(`No more than ${rules.max}`)
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Set basic security headers
export const setSecurityHeaders = () => {
  const meta = document.createElement('meta')
  meta.httpEquiv = 'Content-Security-Policy'
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'"
  document.head.appendChild(meta)
}

// Log security events for debugging
export const logSecurityEvent = (event, details = {}) => {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    details,
    url: window.location.href
  }
  
  console.warn('Security Event:', log)
  
  // Store in localStorage
  const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]')
  logs.push(log)
  
  // Keep only recent logs
  if (logs.length > 50) {
    logs.splice(0, logs.length - 50)
  }
  
  localStorage.setItem('securityLogs', JSON.stringify(logs))
}

// Initialize security features
export const initializeSecurity = () => {
  setSecurityHeaders()
  logSecurityEvent('SECURITY_INITIALIZED')
  
  // Watch for potential security issues
  window.addEventListener('error', (event) => {
    if (event.message.includes('XSS') || event.message.includes('injection')) {
      logSecurityEvent('POTENTIAL_THREAT', {
        message: event.message,
        filename: event.filename
      })
    }
  })
}

export default {
  sanitizeHTML,
  stripHTML,
  escapeHTML,
  sanitizeEmail,
  sanitizeName,
  sanitizeText,
  sanitizeNumber,
  checkPasswordStrength,
  generateCSRFToken,
  validateCSRFToken,
  sanitizeForDatabase,
  createRateLimiter,
  encryptData,
  decryptData,
  validateFormInput,
  setSecurityHeaders,
  logSecurityEvent,
  initializeSecurity
}
