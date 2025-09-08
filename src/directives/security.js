import { escapeHTML, sanitizeHTML, stripHTML } from '@/utils/security'

// Clean up text before displaying
export const vSanitize = {
  mounted(el, binding) {
    const { value, arg } = binding
    
    if (value && typeof value === 'string') {
      if (arg === 'html') {
        el.innerHTML = sanitizeHTML(value)
      } else if (arg === 'text') {
        el.textContent = stripHTML(value)
      } else {
        el.textContent = escapeHTML(value)
      }
    }
  },
  
  updated(el, binding) {
    const { value, arg } = binding
    
    if (value && typeof value === 'string') {
      if (arg === 'html') {
        el.innerHTML = sanitizeHTML(value)
      } else if (arg === 'text') {
        el.textContent = stripHTML(value)
      } else {
        el.textContent = escapeHTML(value)
      }
    }
  }
}

// Clean up input as user types
export const vSanitizeInput = {
  mounted(el) {
    el.addEventListener('input', (event) => {
      const original = event.target.value
      const clean = stripHTML(original)
      
      if (original !== clean) {
        event.target.value = clean
        event.target.dispatchEvent(new Event('input', { bubbles: true }))
      }
    })
  }
}

// Block dangerous clicks
export const vSecureClick = {
  mounted(el, binding) {
    el.addEventListener('click', (event) => {
      if (event.target.tagName === 'SCRIPT' || 
          event.target.tagName === 'OBJECT' || 
          event.target.tagName === 'EMBED') {
        event.preventDefault()
        event.stopPropagation()
        console.warn('Blocked dangerous click')
        return false
      }
      
      if (binding.value && typeof binding.value === 'function') {
        binding.value(event)
      }
    })
  }
}

// Clean form data on submit
export const vSecureForm = {
  mounted(el) {
    el.addEventListener('submit', (event) => {
      const inputs = el.querySelectorAll('input, textarea, select')
      inputs.forEach(input => {
        if (input.type !== 'password' && input.type !== 'email') {
          const original = input.value
          const clean = stripHTML(original)
          
          if (original !== clean) {
            input.value = clean
          }
        }
      })
    })
  }
}

export default {
  vSanitize,
  vSanitizeInput,
  vSecureClick,
  vSecureForm
}
