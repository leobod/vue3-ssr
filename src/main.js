import { /* createApp, */ createSSRApp } from 'vue'
import './style.css'
import App from './App.vue'

// createApp(App).mount('#app')

export const createApp = () => {
    const app = createSSRApp(App)
    return { app }
}
