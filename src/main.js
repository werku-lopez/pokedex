import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'

var app=createApp(App).use(router)
app.mount('#app')
