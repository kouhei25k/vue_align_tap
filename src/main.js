import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vue.config.productionTip = false

createApp(App).use(router).use(VueAxios, axios).use(store).provide('API_URL', process.env.API_SERVER_URL).mount('#app')
