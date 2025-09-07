// This file satisfies A.1 by using Vue.js 3 framework
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core'
import 'bootstrap'

// Import Font Awesome for icons
import '@fortawesome/fontawesome-free/css/all.min.css'



// Import custom CSS
import './assets/css/main.css'

// Initialize user from localStorage
const savedUser = localStorage.getItem('currentUser')
if (savedUser) {
  store.commit('SET_USER', JSON.parse(savedUser))
}

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')