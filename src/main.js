import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import './plugins/axios'

const app = createApp(App)
app.use(createPinia())

app.mount('#app')
